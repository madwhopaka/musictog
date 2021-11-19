import React, { useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { Avatar } from '@material-ui/core'


export const Home = (user) => {
   
    return (
        <div>
           <Container style = {{display:"flex"}}>
           <Card className = "homecard" style = {{ WebkitBackdropFilter: "blur(16px) saturate(180%)", backdropFilter: "blur(16px) saturate(180%)", backgroundColor: "rgba(17, 25, 40, 0.75)", width: "20vw", height: "80vh"}}>
              <Card>
                    <Avatar>    </Avatar>
              </Card>

            </Card>
            <Card className = "homecard" style = {{ WebkitBackdropFilter: "blur(16px) saturate(180%)", backdropFilter: "blur(16px) saturate(180%)", backgroundColor: "rgba(17, 25, 40, 0.75)", width: "50vw", height: "50vh", justifyContent: "center"}}>
                <p>
                    Welcome back, {user.displayName} 
                </p>
                <Button style = {{margin:10, borderRadius:"20px", backgroundColor: "orange", border: "none"}}>
                    Create room
                </Button>
                <Button style = {{margin:10, borderRadius: "20px", backgroundColor: "orange", border: "none", }}>
                    Join Room
                </Button>

            </Card>
           </Container>
        </div>
    )
}
