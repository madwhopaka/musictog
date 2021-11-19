const express = require("express");
const cors = require("cors");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth, getUser, createCustomToken } = require('firebase-admin/auth');

const serviceAccount = require('./key.json');


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore()



app.post("/api/signup", (req, res) => {
  console.log(req.body);
  

    
    res.send({"status" : "ok"});
  })

  app.post("/api/login", (req, res) => {
  
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
    

    

    async function checkUserData(db){
      const citiesRef = db.collection('users');
      const snapshot = await citiesRef.where('email', '==', email).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }else { 
            snapshot.forEach(async (doc) => {
              const uid = doc.id;
              const dbEmail = doc.data().email;
              const dbPassword = doc.data().password;

              // getAuth()
              //   .getUser('GucCw5sCXfNeIHFdQe2KCk2sCMB3')
              //   .then((userRecord) => {
              //     // See the UserRecord reference doc for the contents of userRecord.
              //     console.log(userRecord.toJSON());
              //   })
              //   .catch((error) => {
              //     console.log('Error fetching user data:', error);
              //   });
      
              // if(dbEmail == email && dbPassword == password){
              //   getAuth()
              //     .createCustomToken(uid)
              //     .then((customToken) => {
                    
              //       // console.log(customToken)
              //       res.send(customToken);
              //     })
              //     .catch((error) => {
              //       console.log('Error creating custom token:', error);
              //     });
              // }else {
              //   console.log("password wrong or username");
              // }

              });
            }
    }     

    checkUserData(db);

    
    
    
    
    
    
})







app.listen(process.env.PORT || PORT, () => {
  console.log("Server started at port " + PORT)
})























































