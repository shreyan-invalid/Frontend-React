import React from 'react';
import {Link, Redirect} from 'react-router-dom';


function Home() {
    if(!localStorage.getItem('authorized')){
        return (
            <div>
                
                <h1>Welcome</h1>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register"><button>Register</button></Link>
    
            </div>
        )
    }else{
        return(
            <Redirect to="/session"/>
        )
        
    }
    
}

export default Home
