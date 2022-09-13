const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require('cors')
const knex = require('knex')
const Clarifai = require('clarifai');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageURL = require('./controllers/imageURL');

const ClarifaiApp = new Clarifai.App({
     apiKey: 'a34fa1d0f70d42a18e236da1247d8b46'
});

const db = knex({
     client: 'mysql',
     connection: {
          host: '',
          port: 3306,
          user: '',
          password: '',
          database: ''
     }
});


const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{})

app.post("/signin", signIn.handleSignIn(db, bcrypt))

app.post("/register", register.handleRegister(db, bcrypt))

app.get("/profile/:id", profile.handleProfile(db))

app.put("/image", image.handleImage(db))

app.post("/imageURL", imageURL.handleImageURL(ClarifaiApp, Clarifai))


app.listen(3000)

