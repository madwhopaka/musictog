const express = require("express");
const cors = require("cors");
const http = require("http");
const { SocketAddress } = require("net");
// const socket_io = require('socket.io');
const { generateRoomCode } = require("./newroom.js");
const bodyParser = require("body-parser");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  CollectionReference,
} = require("firebase-admin/firestore");
const { getAuth, getUser, createCustomToken } = require("firebase-admin/auth");
const serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.get("/api", function (req, res) {
  res.send("<h1>Welcome to the Vplay API</h1>");
});

app.post("/api/create-room", async function (req, res) {
  var isUnique = false;
  GenRoomList = db.collection("GenRooms");
  var roomCode;
  while (isUnique == false) {
    roomCode = generateRoomCode(10);
    const snapshot = await GenRoomList.where("code", "==", roomCode).get();
    if (!snapshot.exists) isUnique = true;
    console.log(isUnique);
  }

  var userEmail = req.body.email;
  console.log(req.body);
  var userUid = req.body.id;
  console.log(userEmail, userUid);
  async function addRoomCode(userUid, userEmail, roomCode) {
    RoomListRef = db.collection("Rooms");
    await GenRoomList.add({ code: roomCode, host: userEmail });
    await RoomListRef.doc(userEmail).set(
      { rooms: FieldValue.arrayUnion(roomCode) },
      { merge: true }
    );
  }
  console.log(roomCode);
  await addRoomCode(userUid, userEmail, roomCode).then(() => {
    console.log("Data Added");
  });
  var code = {
    code: roomCode,
  };
  res.json(code);
});

app.post("/api/fetch-rooms", async function (req, res) {
  var userEmail = req.body.userEmail;
  var rooms = [];
  console.log(userEmail);
  await db
    .collection("GenRooms")
    .where("host", "==", userEmail)
    .get()
    .then((querySnapshot) => {
      documents = querySnapshot.docs.map((doc) => doc.data());
      documents.forEach((data) => {
        console.log(data.code);
        rooms.push(data.code);
      });
    })
    .then(() => {
      res.send(rooms);
    });
});

app.post("/api/join-room", async function (req, res) {
  console.log(req.body);
  var roomCode = req.body.code;
  var userEmail = req.body.userEmail;
  var docId;
  snapshot = await db
    .collection("GenRooms")
    .where("code", "==", roomCode)
    .get();
  if (snapshot.empty) {
    console.log("This is invalid code ");
    res.send("404");
  } else {
    documents = snapshot.docs.map((doc) => doc);
    documents.forEach(async (val) => {
      console.log(val.id);
      docId = val.id;
    });
    await db
      .collection("GenRooms")
      .doc(docId)
      .update(
        { ActiveMembers: FieldValue.arrayUnion(userEmail) },
        { merge: true }
      )
      .then(() => {
        console.log("Data added");
        res.send("200");
      });
  }
});



app.post('/api/validate-room', async function (req,res){
  console.log(req.body); 
 var snapshot = await db.collection('GenRooms').where('code','==',req.body.roomCode).get(); 
  if (snapshot.empty) {
    data = {
      code :"404"
    }
    console.log("Ye ho rha hai ")
    res.send(data) ;
  }
  else {
    var host; 
    documents = snapshot.docs.map((doc) => doc.data()); 
    documents.forEach((val)=>host = val.host); 
    console.log(host) ; 
    data = {
      code:"200", 
      host : host,
    }
    res.send(data);
  }
})

app.post("/api/join-myroom", async function (req, res) {
  console.log(req.body);
  var roomCode = req.body.code;
  var userEmail = req.body.userEmail;
  console.log(roomCode);
  var docId;
  db.collection("GenRooms")
    .where("code", "==", roomCode)
    .get()
    .then(async (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => doc);
      documents.forEach(async (val) => {
        docId = val.id;
      });

      await db
        .collection("GenRooms")
        .doc(docId)
        .update(
          { ActiveMembers: FieldValue.arrayUnion(userEmail) },
          { merge: true }
        );
      // do something with documents
    });
  // GenRoomList = db.collection("GenRooms");
  // // var snapshot =  await GenRoomList.where('code', '==',roomCode).get();
  // // if(!snapshot.exists) console.log(true) ;
  res.sendStatus(200);
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started at port " + PORT);
});
