const express = require("express");
const cors = require("cors");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth, getUser, createCustomToken } = require('firebase-admin/auth');
const api = require("../api");

// const serviceAccount = require('./key.json');


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', api);

app.get('/api/login', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})  
// const db = getFirestore()



app.get("/api/signup", (req, res) => {
  res.send('Got a POST request')
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;  
  getAuth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      disabled: false
    })
    .then((userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      console.log(userRecord.providerId)
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });

    
    res.send("Hello this is me ");
  })


app.post

