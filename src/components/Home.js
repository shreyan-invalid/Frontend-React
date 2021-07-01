import React from 'react';
import {Link} from 'react-router-dom';


function Home() {
    return (
        <div>
            
            <h1>Welcome</h1>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>

            {/* <a href="users/register"><Button>Register</Button></a>
            <a href="users/login"><Button>Login</Button></a> */}
        </div>
    )
}

export default Home
