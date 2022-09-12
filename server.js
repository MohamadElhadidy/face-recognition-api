const express = require("express");
const bcrypt = require("bcrypt-nodejs");
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

const database = {
     users:[
          {
               id:"123",
               "name": "mo",
               "email": "mo@gmail.com",
               "password": "ps1",
               "entries": 0,
               "joined": new Date(),
          }, 
          {
               id: "143",
               "name": "ma",
               "email": "ma@gmail.com",
               "password": "ps2",
               "entries": 0,
               "joined": new Date(),
          }
     ],
     login:[
          {
               id: "123",
               hash: "",
               email: "ma@gmail.com"
          }
     ]
}

app.get("/", (req, res)=>{
     res.json(database.users)
})

app.post("/signin", (req, res) => {
     const { email, password } = req.body
     let found = false
     //&& bcrypt.compareSync(password, user.password)
     database.users.forEach(user => {
          if (email == user.email) {
               found = true
               return res.json({ message: 'success', user: user })
          }
     });
     if (!found) res.status(400).json("failed")
})

app.post("/register", (req, res) => {
     const {email, name, password} = req.body
     var hash = bcrypt.hashSync(password);
     database.users.push({
          id: "125",
          "name": name,
          "email": email,
          "password": hash,
          "entries": 0,
          "joined": new Date()
     });
     res.json(database.users[database.users.length - 1])
})

app.get("/profile/:id", (req, res) => {
     const {id} = req.params
     let found = false
     database.users.forEach(user =>{
          if (user.id === id) {
               found = true
               return res.json(user)
          }
     });
     if(!found)res.status(400).json("not found")
})

app.put("/image", (req, res) => {
     const { id } = req.body
     let found = false
     database.users.forEach(user => {
          if (user.id === id) {
               user.entries++
               found = true
               return res.json(user.entries)
          }
     });
     if (!found) res.status(400).json("not found")
})

app.listen(3000, ()=>{
console.log("running")
})

