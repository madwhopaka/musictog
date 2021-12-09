var express = require('express')
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getAuth, getUser, createCustomToken } = require('firebase-admin/auth');
var router = express.Router()

const serviceAccount = require('./key.json');

initializeApp({
  credential: cert(serviceAccount)
});


const db = getFirestore()

router.get('/', function(req,res){
    res.send('<h1>Hello World</h1>')
})





router.post("signup", function(req, res){
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.username; 
  console.log(email); 
  console.log(password); 
  if ((email!=null || email !='') && (password!=null || password!='') ) {
    getAuth()
    .createUser({
      email: email,
      emailVerified: false,
      password: password,
      disabled: false
    })
    .then(async (userRecord) => {
      // See the UserRecord reference doc for the contents of userRecord.
      const userId = userRecord.uid;
      console.log('Successfully created new user:', userRecord.uid);
      console.log(userRecord.providerId)
      const data = {
        email: email,
        userName: userName
      };
      
      // Add a new document in collection "cities" with ID 'LA'
      const res = await db.collection('users').doc(userId).set(data);
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
    });
}
  

    
    res.send({"status" : "ok"});
}) 

// define the home page route
router.post('/login', function (req, res) {
   res.send("How are you ? ")
    const email = req.body.email;
    const password = req.body.password;  
    // getAuth()
    //   .createUser({
    //     email: email,
    //     emailVerified: false,
    //     password: password,
    //     disabled: false
    //   })
    //   .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log('Successfully created new user:', userRecord.uid);
    //     console.log(userRecord.providerId)
    //   })
    //   .catch((error) => {
    //     console.log('Error creating new user:', error);
    //   });
    

    

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

              getAuth()
                .getUser('GucCw5sCXfNeIHFdQe2KCk2sCMB3')
                .then((userRecord) => {
                  // See the UserRecord reference doc for the contents of userRecord.
                  console.log(userRecord.toJSON());
                })
                .catch((error) => {
                  console.log('Error fetching user data:', error);
                });
      
              if(dbEmail == email && dbPassword == password){
                getAuth()
                  .createCustomToken(uid)
                  .then((customToken) => {
                    
                    // console.log(customToken)
                    res.send(customToken);
                  })
                  .catch((error) => {
                    console.log('Error creating custom token:', error);
                  });
              }else {
                console.log("password wrong or username");
              }

              });
            }
    }     

    checkUserData(db);

    
    
    
   
})


module.exports = router;