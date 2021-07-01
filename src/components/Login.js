import React from 'react'
import {Link} from 'react-router-dom';

function Login() {
    return (
        <div>
            <form action="/login" method="POST">
                <div>
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required/>
                </div>
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default Login
