import React, { useState } from "react";
import "./Login.css";
import { auth } from "./firebase";
import logo from "../src/images/impulse bg.gif";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {
  
  Typography,
 
} from "@material-ui/core";
import {
 
  Link,
 
} from "react-router-dom";



const useStyles = makeStyles((theme) => ({

  root: {
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
     


  },


  fields: {
      margin: theme.spacing(1),
     

  },
  field1: {
      margin: theme.spacing(1),
      marginBottom: 15,

  },

  field2: {
      margin: theme.spacing(1),
      marginBottom: 40,
  },

  text: {
      justifyContent: "center",
      alignItems: "center",
      display: 'flex',
    
  },

  loginCard: {
      minWidth: '300px',

  },
  loginForm: {

      display: "flex",
      flexDirection: "column",
      marginTop: '20px',
    


  },
  hr: {
      margin: 'auto 20px',
      width: '100%',
      border: ' 1px solid rgb(150, 150, 150)',
  },

  rootbox: {
      flex: .8,
      flexDirection: 'column',
      justifyContent: 'space-between',
      display: 'flex',
      alignItems: "center",
  },

      rootboxstore: {
          
          flexDirection: 'column',
          marginTop:"15px",
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: "center",
          textAlign: 'center',
          

      },

  parentbox: {
      flex: 1,
      flexDirection: 'row',
  },
  parentboxstore: {
      flex: 1,
      flexDirection: 'row',
     
  },

  childbox: {
      flexDirection: 'column'
  },
  childboxstore: {
      flexDirection: 'column',
      marginTop: '10px',
     
  },
  store: {
      height: '30px',
      marginLeft:"5px",
      marginRight:"5px",
      marginBottom:"15px",
  },

  texticon: {
      justifyContent: "center",
      alignItems: "center",
      display: 'flex',
      marginBottom: '20px'
  },
  


}));
 


function ForgotPassword() {
  const classes = useStyles();
 
  const [email, setEmail] = useState("");



  const loginn = (e) => {
    e.preventDefault();

     //backend
   

     auth.sendPasswordResetEmail(email).then(function () {
         // Email sent.
         alert("Email sent");
     }).catch(function (error) {
         // An error happened.
         alert("Your Email is not register");
     });



  };

  return (
    
    <div className="login" >
        <img src={logo} alt=""  class="login__logos" />
     
     
      <div className="login__container">
        
        <h3> <img src="https://dcassetcdn.com/design_img/1991661/580863/580863_10613380_1991661_5aab9ee1_image.jpg" class="login__logo" alt="logo pic" /></h3>
        <form >
          <center>
            <input 
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email Address"
            />

          </center>
          
          <center>
            <button onClick={loginn} type="submit" class="login__login">
              Send
            </button>
          </center>
          </form>
          <center>
            <div class="sideinfo">
             
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <h5 class="rtd">Already have an account?</h5>
              </Link>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <h5 class="rtd">Sign up for Impulse</h5>
              </Link>
            </div>
          </center>
        
        
      
     
      <div className="login__container">
      <Box className={classes.rootboxstore}>
                <Box className={classes.parentbox}>
                <Typography variant="h7" color="textPrimary" >Get the app.</Typography>
                    <Box className={classes.childboxstore}>
                        <img className={classes.store} src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt=""></img>
                        <img className={classes.store} src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt=""></img></Box>
                </Box>
            </Box >
            </div>
            </div>

    </div>
  );
}

export default ForgotPassword;
