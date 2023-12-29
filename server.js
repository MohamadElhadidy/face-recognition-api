require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const env = process.env

const db = knex({
     client: 'mysql',
     connection: {
          host: env.DATABASE_HOST,
          port: env.DATABASE_PORT,
          user: env.DATABASE_USER,
          password: env.DATABASE_PASSWORD,
          database: env.DATABASE
     }
});


const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
     res.json('Server Is running')
})

app.post("/signin", login.handleSignIn(db, bcrypt))

app.post("/register", register.handleRegister(db, bcrypt))

app.get("/profile/:id", profile.handleProfile(db))

app.put("/image", image.handleImage(db))

app.post("/imageURL", image.handleApiCall)


app.listen(env.SERVER_PORT,'localhost')

