import React, {useState ,useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./chatui.css";
import chatIcon from "./assets/chat-icon.png";
import io from 'socket.io-client' ; 
import {TextField} from '@material-ui/core'

var message_arr = [] ;

var socket = io('http://192.168.104:4001', { transports: ['websocket', 'polling', 'flashsocket'], });



var my_username ; 

export const ChatRoom = () => {
    
    
        const [message, setMessage] = useState("") ; 
        const[messageList, setMessageList] = useState([]); 
        
        
        useEffect(() => {
           
           my_username =  prompt("Enter your name")
            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
              });

            socket.emit("new-user-joined", my_username)
       
       
            socket.on("users-joined", (username) => {
              var data = {
                   message: "I just joined the chat", 
                   side : "left" , 
                   username:  username 
               }

               setMessageList((list)=>[...list, data]); 
                
              });
              
            socket.on("recieve", (data) => {
                console.log(data.side);
                setMessageList((list)=>[...list, data]); 
                
              });
              
            socket.on("leave", (username) => {
              var  data = {
                    message: "I am leaving this chat", 
                    username: username ,
                    side: "left"
                }

              setMessageList((list)=> [...list, data])
              });
       
            return()=> {
                socket.disconnect();
            }
       
       
          }, [socket]);
    

 
        
            
        const handleSend =  async (e)=> {
                e.preventDefault() 
               if (message!= "") { ; 
               console.log(message);
              var data = {
                   message: message, username: my_username, side:"left"
               }
               var my_message = {
                   message:message, username:"You", side: "right"
               }
               setMessageList((list)=>[...list, my_message]); 
               socket.emit("send", data);
               setMessage("") ;   }
             

        }

           return (
        <React.Fragment>
           <Container style = {{display: "flex" , justifyContent :"right", float: "right" , width: 600, flexDirection: "column", alignItems: "center"}}>
            <Container>
            <Navbar
                
                className="navbar-out"
               
               
            >
                <Navbar.Brand href="#home" className="navbar-items">
                    <img
                        alt=""
                        src={chatIcon}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                VPlay Chat
            </Navbar>
            </Container>
            <Container className = "cont">
                <div className= "message-area">
                 
                {messageList.map((msg)=>{ 
                    var side = `${msg.side}side`; 
                    return (
                        <div className = {side}>
                   
                        <div className= "messageBox">{msg.message}</div>
                        {msg.username}
                    </div> 
                      ) ; 
                    
                })}
                </div>
            </Container>

            <Container style = {{display: "flex" , justifyContent: "center", alignItems: "center"}}> 
                <form onSubmit= {handleSend} style = {{display: "flex" , justifyContent: "space-around",  alignItems: "center"}}>
                <input id= "inputBar" onChange = {(e)=>{setMessage(e.target.value)}}   value = {message } placeholder = "Message " />
                <button id= 'send-btn' type = "submit">
                    <i className= "fa fa-paper-plane"></i>
                </button>
                </form>
            </Container>
           </Container>
            
        </React.Fragment>
    );
};



