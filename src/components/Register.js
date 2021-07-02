import React,{useState} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom';
import Axios from "axios";

function Register() {
    const [user,setUser] = useState({name:'',email:'',password:'',confirmPassword:''});
    const history= useHistory();
    let name, value;
    //Update changes in form
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    // Takes an event a dispatches an event to register the user throught the api
    const postRegisterData = async (e) => {
        console.log('Registering');
        e.preventDefault();
        function register (){
            Axios({
              method: "POST",
              data: {
                name: user.name,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword
              },
              withCredentials: true,
              url: "http://localhost:5000/register",
            }).then((res) => {
                if(res.data === "User Created"){
                    history.push('/login');
                }else{
                    alert(res.data);
                }
            })
            .catch(err => console.log(err));

        };
    
        
        register();
    
      };

    
    if(!sessionStorage.getItem('authorized')){
        return (
            <div>
                <form method="POST">
                    <div>
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} required/>
                    </div>
                        <button type="submit" onClick={postRegisterData}>Register</button>
                    </form>
                <Link to="/login">Login</Link>
            </div>
        )
    }else{
        
        return(
            <Redirect to="/session"/>
        )
        
    }
    
}

export default Register;