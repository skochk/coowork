import React, { Component , useState } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


export default function(props) {
    const [loginData, changingLogin] = useState('');
    const [passwordData, changingPassword] = useState('');
    const [emailData, changingEmail] = useState('');
    function handleLoginChange(e){
        changingLogin(e.target.value);
    }
    function handlePasswordChange(e){
        changingPassword(e.target.value)
    }
    function handleEmailChange(e){
        changingEmail(e.target.value)
    }


    function handleSubmit(event){
        event.preventDefault();
        axios.post('/login/registration',
        {
            login: loginData,
            password: passwordData,
            email: emailData
        }
        )
        .then(data => console.log(data.data)).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Enter username</label>
            <input id="username" name="login" type="text" onChange={handleLoginChange}/>
            
            <label htmlFor="password">password</label>
            <input id="password" name="password" type="password"  onChange={handlePasswordChange}/>
            
            <label htmlFor="email">Enter your email</label>
            <input id="email" name="email" type="email"  onChange={handleEmailChange} />
            <button>Register</button>
        </form>
        </>
    )
    function TestComp(){
        return <h1>test</h1>
    }
}