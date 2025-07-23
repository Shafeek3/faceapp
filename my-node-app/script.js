// server.js
require('dotenv').config();  
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require('knex');
const fetch = require("node-fetch");


const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }  // ✅ Render Postgres requires SSL
      }
    : {
        host: '127.0.0.1',
        port: 5432,
        user: 'shafe',
        password: 'shafeek',
        database: 'faceapp'
      },
  searchPath: ['public'],
  debug: true,
});

const app = express();
app.use(cors());
app.use(express.json());

// Clarifai API settings
const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY;
const USER_ID = process.env.CLARIFAI_USER_ID;   // optional
const APP_ID = process.env.CLARIFAI_APP_ID;     // optional
const MODEL_ID = "face-detection";
const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";


// SIGNUP route
app.post('/signup', async (req, res) => {
  const { email, name, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const hash = bcrypt.hashSync(password, 10);
    await db.transaction(async trx => {
      const loginEmailArr = await trx('login')
        .insert({ email: email.toLowerCase(), hash })
        .returning('email');
      
      const [user] = await trx('users')
        .insert({
          email: loginEmailArr[0].email,
          name,
          joined: new Date(),
          entries: 0
        })
        .returning(['id','name','email','entries','joined']);

      res.json({ user });
    });
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === '23505') {
      res.status(400).json({ error: 'Email is already registered' });
    } else {
      res.status(500).json({ error: 'Unable to register' });
    }
  }
});

// SIGNIN route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [loginData] = await db('login')
      .select('email', 'hash')
      .where('email', '=', email.toLowerCase());
    
    if (!loginData) return res.status(400).json({ error: 'Wrong credentials' });
    const isValid = bcrypt.compareSync(password, loginData.hash);
    if (!isValid) return res.status(400).json({ error: 'Wrong credentials' });

    const [user] = await db('users')
      .select('id','name','email','entries','joined')
      .where('email', '=', email.toLowerCase());
    
    if (!user) return res.status(400).json({ error: 'Unable to get user' });
    res.json({ user });

  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: 'Unable to sign in' });
  }
});

// PROFILE route
app.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await db('users').where({ id });
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ user });
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ error: 'Error getting user' });
  }
});

// IMAGE route (increment entries)
app.put('/image', async (req, res) => {
  const { id } = req.body;
  try {
    const [updated] = await db('users')
      .where({ id })
      .increment('entries', 1)
      .returning('entries');
    res.json({ entries: updated.entries });
  } catch (err) {
    console.error('Image error:', err);
    res.status(500).json({ error: 'Unable to update entries' });
  }
});

// ---------- NEW CLARIFAI ROUTE ----------
app.post("/clarifai", async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) return res.status(400).json({ error: "No image URL provided" });

  try {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUrl
            }
          }
        }
      ]
    });

  const clarifaiResponse = await fetch(
  `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
  {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Key ${CLARIFAI_API_KEY}`,
    },
    body: raw
  }
);


    const data = await clarifaiResponse.json();
    res.json(data);

  } catch (err) {
    console.error("Clarifai API Error:", err);
    res.status(500).json({ error: "Unable to call Clarifai API" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is running on port ${process.env.PORT || 3000}`);
});
