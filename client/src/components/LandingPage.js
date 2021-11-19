import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom';
import fire, { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "../fire.js";
import {Login} from './Login.js';
import {SignUp} from  './SignUp.js';
import {Home } from './mainpage';

export const LandingPage = () => {
  
    return (
        <div>
              <Router>
                            <Switch>
                               <Route exact path= "/">
                                   
                             <div className ="slash-page-card" >
                                <p> Vplay  </p>
                                Jukebox is a social media player that lets you 
                                share music across limitless people, devices and speakers,
                                 whether they're in the same room or halfway across the world. 
                                 Create & share your Jukebox now
                                <button>
                                 <Link style = {{textDecoration: "none", fontFamily: "fantasy"}} to= "/login">Get Started</Link>
                                </button>
                                </div>

                                </Route>

                                <Route exact path = "/home"> 

                                    <Home />

                                </Route>

                                <Route exact path="/login">
                                   
                                       <Login />
                                        
                                   
                                </Route>
                                <Route path="/signup">
                                    <SignUp />
                                </Route>
                            </Switch>  
                    </Router>
        </div>
    )
}
