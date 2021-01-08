import {BrowserRouter as Router} from 'react-router-dom'
import LogoDype1 from './LogoDype1.svg';
import LogoDype2 from './LogoDype2.svg';
import './App.css';

import React, {useState} from 'react';
import {Input,Button} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {provider, Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import token from './token'

const store = createStore(combineReducers({ token }))

const App = (props) => {

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  const [userExists, setUserExists] = useState(false)

  const [listErrorsSignup, setErrorsSignup] = useState([])

  var handleSubmitSignup = async () => {
    
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
    })

    const body = await data.json()

    if(body.result == true){
      // props.addToken(body.token)
      setUserExists(true)
      
    } else {
      setErrorsSignup(body.error)
    }
  }

  if(userExists){
    return <Redirect to='/sign-up' />
  }

  var tabErrorsSignup = listErrorsSignup.map((error,i) => {
    return(<p>{error}</p>)
  })

  return (
    <Provider store={store}>
      <Router>
    <div className="App">
        
        <div style={head}>
            <img style={{paddingRight:"85%"}} src={LogoDype1} alt="logoDype" />
            <Button color="secondary">télécharger l'application</Button>{' '}       
        </div>
        
        <div style={body}>
            <img style={{paddingRight:"85%"}} src={LogoDype2} alt="logoDype" />
            <Input style={{borderRadius:50,}} onChange={(e) => setSignUpUsername(e.target.value)} className="Login-input" placeholder="username" />

            <Input style={{borderRadius:50,}} onChange={(e) => setSignUpEmail(e.target.value)} className="Login-input" placeholder="email" />

            <Input.Password onChange={(e) => setSignUpPassword(e.target.value)} className="Login-input" placeholder="password" />
      
            {tabErrorsSignup}

            <Button onClick={() => handleSubmitSignup()} style={{width:'80px'}} type="primary">S’inscrire</Button>
            
        </div>
        
        <div style={bottom}>
         <h style={{paddingRight:"85%"}}>Dype</h>
         <h>Societe</h>
         
        </div>
    </div>
    </Router>
  </Provider>
  );

}



const head = {
  backgroundColor: '#EF626C',
};
const body = {
  backgroundColor:'#FFDFE2', 
  padding:'14%',
};
const bottom = {
  backgroundColor:'#333367',
  padding:'5%' 
};


export default App;
