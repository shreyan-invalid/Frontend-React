import React,{useEffect, useState} from 'react';
import {Link, Redirect, useHistory} from 'react-router-dom';
import Axios from 'axios';


function Session() {
    const [data, setData]= useState({});
    console.log(data);
    const history= useHistory();

    useEffect(() => {
        function getUser() {
            Axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:5000/api/session",
            }).then((res) => {
              console.log(res);
              setData(res.data);
            });
        };

        getUser();
    }, [])

    function logout(e){
        e.preventDefault();

        function logoutUser(){
            Axios({
                method: "DELETE",
                withCredentials: true,
                url: "http://localhost:5000/api/session",
              }).then((res) => {
                console.log(res.data);
                sessionStorage.removeItem('authorized');
                history.push('/');
              }).catch(err => console.log(err));
        }

        logoutUser();
    }

    if(sessionStorage.getItem('authorized')){
        
        return (
            <div>
                <h1>Welcome {data.user?.username}</h1>
                <h2>You have  sessions runnin in {data.user?.ipAddress}!</h2>
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
