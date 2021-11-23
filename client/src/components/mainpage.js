import React, { useEffect,useState} from 'react'

import {Button} from '@material-ui/core'
// import Container from 'react-bootstrap/Container'
import {Container} from "@material-ui/core";
import {Card} from "@material-ui/core";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import './form.css';
import axios from 'axios' ;
import { Avatar } from '@material-ui/core'
import { CopyToClipboard } from "react-copy-to-clipboard";
import fire, { getAuth } from '../fire.js'



export const Home = (props) => {
    
    const [createPressed, ToggleCreatePressed] = useState(false) ; 
    const nav=  useNavigate() ;
    const [code, setCode] = useState('') ;  
    async function handleCreateRoomm() {
        console.log("hello");
        var name = "madhu" ; 
       
        await axios.post('http://localhost:4000/api/createroom', {"name": "madhu"})
        .then((response) =>{
            console.log(`request complete: ${JSON.stringify(response.data)}`);
           var roomCode = JSON.stringify(response.data["code"]);  
           setCode(roomCode) ;      
            console.log(roomCode); 
            ToggleCreatePressed(true) ;
       
       }) ; 
      
      
       }

        function signOut() {
            getAuth().signOut();
            nav('/');
        }
     
    return (
        
      
        <Container xs = {12} md = {12} sm = {12}  style={{
            display:"flex", justifyContent:"center",
          }}>
         <Container style = {{display:"flex", flexDirection:"column",justifyContent:"start", alignItems:"center",width: "20vw", height: "80vh",
     boxShadow : "0 8px 32px 0 rgba(31, 38, 135, 0.50)", backgroundColor: "rgba(255, 255, 255, 0.17)", backdropFilter: "blur(8.5px)", borderRadius:10, border: "2px solid grey"  }}>
            <div>
                <Avatar>
                    M
                </Avatar>
            </div>
       </Container>
     {(createPressed && code!='')?<RoomDetails code = {code} />:  <Container style = {{display:"flex", flexDirection:"column",justifyContent:"start", alignItems:"center", width: "50vw", height: "50vh",
     boxShadow : "0 8px 32px 0 rgba(31, 38, 135, 0.50)", backgroundColor: "rgba(255, 255, 255, 0.17)", backdropFilter: "blur(8.5px)", borderRadius:10, border: "2px solid grey"  }}>
          
            <h2  className = "simpletext" style = {{color: "white", fontFamily: "`Poppins`, sans-serif "}}>
                    Welcome back, 
                </h2>
              <ButtonContainer>
              <button className= "button1" onClick = {()=>{handleCreateRoomm();}}>
                    Create room
              </button>
              
                <button className = "button1" >
                    Join Room
                </button>
              </ButtonContainer>
            
                <h1>
 Your are signed in
 <span onClick={signOut}>
     <a href="#">Sign out</a>
 </span>
 </h1>
          
       </Container>}
        </ Container>
    )
}





export const RoomDetails = (props) => {
    const [isCopied, setIsCopied] = useState(false);
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      };
    return (

       <Container style = {{margin:10, display:"flex", flexDirection:"column", color:"white" , alignItems:"center", justifyContent:"center"}}>
            <Card className = "room-details">  Room Code :  {props.code}
            <CopyToClipboard text ={props.code} onCopy={onCopyText}>
        <div className="copy-area">
          <button className= "copy-button">{isCopied? <div>Copied</div>: <div><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg></div>}</button>
          
        </div>
      </CopyToClipboard>
            </Card>
           
            <button className = "button1"> 
                Join the room
            </button>
       </Container>
                   
    )
}


const ButtonContainer = styled.div `
margin: 1rem ; 
width : 100%; 
display: flex; 
flex-direction: column; 
align-items :center; 
justify-content: space-around ;
`


