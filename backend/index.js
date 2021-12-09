const express = require("express", {
  
});
const cors = require("cors");
const http = require("http");
const { SocketAddress } = require("net");
const socket_io = require('socket.io');
const {generateRoomCode} = require("./newroom.js");
var bodyParser = require('body-parser');





const app = express();
const PORT = 4001;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function (req, res) {
  res.send('Server on...Connections 0');
})

app.post('/api/create-room', function(req,res){
  var roomCode = generateRoomCode(10) ;
  var userEmail = req.body.email ;
  console.log(req.body);
  var userUid = req.body.id; 
  console.log(userEmail,userUid); 
  // async function addRoomCode(userId) {
  //    RoomListRef  = db.collection("Rooms"); 
  //   RoomListRef.doc(user.email).add(roomCode);  
  // }
 console.log(roomCode) ; 

 var code  = {
   "code" :roomCode, 
 }
 res.json(code);
});

const server = http.createServer(app)
const io = socket_io(server)  




var users =[]; 

io.on('connection', (socket) => {

  
  
  socket.on("new-user-joined", (username)=>{
    users[socket.id] = username ;
    console.log(`new user ${socket.id} ${users[socket.id]} has joined the chat`);
    socket.broadcast.emit("users-joined", username)
  })

  
  socket.on("send", (data) => {
    socket.broadcast.emit("recieve",data);
  });

  socket.on("disconnect", () => {
    
    console.log(users[socket.id])
    
    socket.broadcast.emit("leave",users[socket.id] )
    console.log("User left")
  });
})







server.listen( PORT, () => {
  console.log("Server started at port " + PORT)
})























































