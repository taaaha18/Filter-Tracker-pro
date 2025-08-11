const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json("Hi I am backend");
});

const config = {
    user: "taha_user",
    password: "123456",
    server: "DESKTOP-A0FNJ0V",
    database: "Oil_Change",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

// GET all users
app.get('/card', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query("SELECT * FROM [Users]");
        return res.json(result.recordset);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

//Gemini Functionality

async function callGeminiAPI({ model, engine_cc, mileage, region }) {
  // Replace with your Gemini logic or API call
  const prompt = `
Give me the best recommended engine oils for the following car specs:

- Model: ${model}
- Engine CC: ${engine_cc}
- Mileage: ${mileage} km
- Region: ${region}

The recommendation should be:
- Only names of the engine oils
- Each with their viscosity
- Listed as bullet points
`;

  try {
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD3bYfFvUPzWkRC2ou97BdsT0NBLtizw3s', {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const suggestion = response.data.candidates[0].content.parts[0].text;
    return suggestion;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Unable to fetch suggestion right now.';
  }
}

//Function to call gemini api
// Function to call Gemini API
async function callGeminiASK({ recommendation, query }) {
  const contents = [
    {
      role: "user",
      parts: [{ text: recommendation }]
    },
    {
      role: "user",
      parts: [{ text: query }]
    },
    {
      role: "user",
      parts: [{ text: "the answer should be in 2 to 4 lines" }] // Added hardcoded query
    }
  ];

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD3bYfFvUPzWkRC2ou97BdsT0NBLtizw3s',
      { contents }
    );

    // Extract the suggestion from the API response
    const suggestion = response.data.candidates[0].content.parts[0].text;
    return suggestion;
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'Unable to fetch suggestion right now.';
  }
}


// POST new user (NOTE: Changed route from /register to /signup to match frontend)
app.post('/signup', async (req, res) => {
    const {
        name,
        fullName,
        email,
        username,
        dob,
        region,
        phone,
        password,
        
        
       
        
    } = req.body;

    try {
        await sql.connect(config);

        const request = new sql.Request();
        request.input('name', sql.NVarChar(50), name);
        request.input('full_name', sql.NVarChar(100), fullName); // matched frontend key
        request.input('username', sql.NVarChar(50), username);
        request.input('password', sql.NVarChar(255), password);
        request.input('phone_number', sql.NVarChar(15), phone);
        request.input('region', sql.NVarChar(50), region);
        request.input('DOB', sql.Date, dob);
        request.input('email', sql.NVarChar(100), email);

        await request.query(`
            INSERT INTO [Users] 
            (name, full_name, username, password, phone_number, region, DOB, email)
            VALUES (@name, @full_name, @username, @password, @phone_number, @region, @DOB, @email)
        `);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        if (err.number === 2627) {
            return res.status(409).json({ error: "Username already exists" });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

//LOGIN Page

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      await sql.connect(config);
      const request = new sql.Request();
      request.input("username", sql.NVarChar(50), username);
      request.input("password", sql.NVarChar(255), password);
  
      const result = await request.query(`
        SELECT * FROM [Users] 
        WHERE username = @username AND password = @password
      `);
  
      if (result.recordset.length > 0) {
        return res.json({ success: true });
      } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
  
// API route to handle Vehicle form submission
app.post('/api/vehicle-data', async (req, res) => {
  const {
    vehicleNumber, // Now accepting vehicle number from the request
    username,
    region,
    vehicleType,
    make,
    model,
    engineCC,
    mileage,
    lastOilChange
  } = req.body;

  try {
    await sql.connect(config);

    // Merge statement to insert or update vehicle data based on vehicle_number
    const result = await sql.query`
      MERGE INTO vehicle AS target
      USING (SELECT ${parseInt(vehicleNumber)} AS vehicle_number) AS source
      ON target.vehicle_number = source.vehicle_number
      WHEN MATCHED THEN
        UPDATE SET
          target.username = ${username},
          target.region = ${region},
          target.vehicle_type = ${vehicleType},
          target.make = ${make},
          target.model = ${model},
          target.engine_cc = ${parseInt(engineCC)},
          target.mileage = ${parseInt(mileage)},
          target.last_oil_change_date = ${lastOilChange || null}
      WHEN NOT MATCHED BY TARGET THEN
        INSERT (
          vehicle_number, username, region, vehicle_type, make, model, engine_cc, mileage, last_oil_change_date
        )
        VALUES (
          ${parseInt(vehicleNumber)}, ${username}, ${region}, ${vehicleType}, ${make}, ${model}, ${parseInt(engineCC)}, ${parseInt(mileage)}, ${lastOilChange || null}
        );
    `;

    res.json({ message: 'Vehicle data submitted or updated successfully.' });
  } catch (err) {
    console.error('Error processing vehicle data:', err);
    res.status(500).json({ message: 'Error processing vehicle data', error: err.message });
  }
});

//

//Dashboard1 page backend

app.post('/api/vehicle-info', async (req, res) => {
  const { username } = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('username', sql.NVarChar(50), username);

    const result = await request.query(`
      SELECT vehicle_number, mileage, last_oil_change_date 
      FROM vehicle 
      WHERE username = @username
    `);

    if (result.recordset.length > 0) {
      res.json(result.recordset); // Send all vehicle records for this user
    } else {
      res.status(404).json({ message: 'No vehicles found for this user.' });
    }
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'Server error while fetching vehicle info.' });
  }
});

//Gemini Api 
 
app.post('/api/get-recommendation-by-vehicle', async (req, res) => {
  const { vehicle_number } = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('vehicle_number', sql.Int, vehicle_number);

    const result = await request.query(`
      SELECT model, engine_cc, mileage, region
      FROM vehicle
      WHERE vehicle_number = @vehicle_number
    `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found.' });
    }

    const vehicle = result.recordset[0];

    // Now call Gemini API here
    const suggestion = await callGeminiAPI(vehicle); // You should implement this function

    res.json({ suggestion });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error occurred.' });
  }
});

app.post('/api/send-query', async (req, res) => {
  const { recommendation, query } = req.body;

  try {
    // Call Gemini API with recommendation and query
    const asking = await callGeminiASK({ recommendation, query });


    // Send the Gemini response back to the frontend
    res.json({
      message: 'Query received successfully!',
      geminiResponse: asking,
    });
  } catch (error) {
    console.error('Error in Gemini API call:', error);
    res.status(500).json({ message: 'Failed to get response from Gemini API' });
  }
});

app.listen(3000, () => {
    console.log("The server has started on port 3000");
});

//update profile

// Update Profile API
app.post('/api/update-profile', async (req, res) => {
  const { username, oldPassword, newPassword, email } = req.body;

  try {
      await sql.connect(config);
      const request = new sql.Request();
      request.input("username", sql.NVarChar(50), username);
      request.input("oldPassword", sql.NVarChar(255), oldPassword);

      // First check if user exists with given username and old password
      const userResult = await request.query(`
          SELECT * FROM [Users] 
          WHERE username = @username AND password = @oldPassword
      `);

      if (userResult.recordset.length === 0) {
          return res.status(401).json({ success: false, message: "Incorrect old password or username." });
      }

      // If user exists, update the password and email
      const updateRequest = new sql.Request();
      updateRequest.input("username", sql.NVarChar(50), username);
      updateRequest.input("newPassword", sql.NVarChar(255), newPassword);
      updateRequest.input("email", sql.NVarChar(100), email);

      await updateRequest.query(`
          UPDATE [Users]
          SET password = @newPassword, email = @email
          WHERE username = @username
      `);

      return res.json({ success: true, message: "Profile updated successfully." });
  } catch (error) {
      console.error("Update Profile error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
//vehicle details 
app.post('/api/vehicle-info', async (req, res) => {
  const { username } = req.body;

  try {
    await sql.connect(config);
    const request = new sql.Request();
    request.input('username', sql.NVarChar(50), username);

    const result = await request.query(
      `SELECT vehicle_number, make, model, engine_cc, mileage, last_oil_change_date 
       FROM vehicle 
       WHERE username = @username`
    );

    console.log('Fetched vehicle data:', result.recordset); // Log the result

    if (result.recordset.length > 0) {
      res.json(result.recordset); // Send all vehicle records for this user
    } else {
      res.status(404).json({ message: 'No vehicles found for this user.' });
    }
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ message: 'Server error while fetching vehicle info.' });
  }
});
