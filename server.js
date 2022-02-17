const express = require('express'); //Line 1
const app = express(); //Line 2
const {spawn} = require('child_process');
const port = process.env.PORT || 8888; //Line 3
const router = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
var mongoDB = '';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyparser = require("body-parser");

var userModel;
const users = [
  {id: 1, user: "bob", pass: "hashed123"}
];

let count = 1;
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

const connectToServer = async () => {
  try {
    await mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
    const userSchema = new mongoose.Schema(
      {
        user : String,
        pass : String
      }
    );

    const connection = await mongoose.createConnection(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
    userModel = await connection.model("User Schema", userSchema);

  }
  catch (error){
    console.log(error);
  }
}

app.get('/', (req, res) => {

 var dataToSend;

 const python = spawn('python', ['musicgenreclassificationloading.py']);

 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
 });

})

// auth
app.post('/', (req, res) => {
  if (!req.body.user || req.body.password){
    res.json({success : false, error: "No username or password"});
  }

  Database.User.create({
    user : req.body.user,
    password : bcrypt.hashSync(req.body.password, 15),
  }).then((user) => {
    const token = jwt.sign({id : user._id, user : user.user}, SECRET_JWT_CODE)
    res.json({success : true, token: token})
  }).catch((error) => {
    res.json({success: false, error: error})
    })
})
