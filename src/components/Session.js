import React,{useEffect, useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import Axios from 'axios';


function Session() {
    const [data, setData]= useState('');
    const history= useHistory();

    useEffect(() => {
        function getUser() {
            Axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:5000/user",
            }).then((res) => {
              setData(res.data);
              console.log(res.data.name);
            });
        };

        getUser();
    }, [])

    function logout(e){
        e.preventDefault();

        function logoutUser(){
            Axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:5000/logout",
              }).then((res) => {
                console.log(res.data);
                history.push('/');
                localStorage.removeItem('authorized');
              }).catch(err => console.log(err));
        }

        logoutUser();
    }

    if(localStorage.getItem('authorized')){
        
        return (
            <div>
                <h1>Welcome {data.name}</h1>
                <h2>You have {data.session} sessions runnin!</h2>
                {/* Logout button */}
                <button onClick={logout}>Logout</button>
            </div>
        )
    }else{  
        
        return(
            <Redirect to="/login"/>
        )
    }
    
}

export default Session
