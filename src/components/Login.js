import React,{useState,useEffect} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import Axios from 'axios';
const SITE_KEY = "6LdFmGsbAAAAAP9O3oK2h9FLN5ldyEbHNvPes4L6";

function Login() {
    const history=useHistory();



    const [user, setUser] = useState({email:'',password:'',messageSent:false});

    
  
    let name, value;
    //Update changes in form
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    
      };

    //Google Recaptcha
      useEffect(() => {
        const loadScriptByURL = (id, url, callback) => {
          const isScriptExist = document.getElementById(id);
     
          if (!isScriptExist) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.id = id;
            script.onload = function () {
              if (callback) callback();
            };
            document.body.appendChild(script);
          }
     
          if (isScriptExist && callback) callback();
        }
     
        
        loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`, function () {
          console.log("Script loaded!");
        });
      }, []);

      const handleOnClick = e => {
        e.preventDefault();
        
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(token => {
            submitData(token);
          });
        });
      };


      
      // call a backend API to verify reCAPTCHA response

      const submitData = token => {
        fetch('http://localhost:4000/verify', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            
            "email": user.email,
            "password": user.password,
            "g-recaptcha-response": token
          })
        }).then(res => res.json()).then(res => {
          console.log(res.score); // we get the score here , so you can choose the minimum score you can allow

          if(res.score>0.6){
            //------
            //send the email and password for passport authentication (make an API to backend)
              postLoginData();



          }
          else{
              //-----
              //dont allow entry to the user.
              history.push('/login');
          }
         
     
        });
      };

      const postLoginData = async () => {
        
        // method to post to the API
        function login (){
          Axios({
            method: "POST",
            data: {
              email: user.email,
              password: user.password,
            },
            withCredentials: true,
            url: "http://localhost:5000/login",
          }).then((res) => {
              console.log(res);
              const data= res.data;

              if(data === true){
                
                // setting a local variable for persistance and not going into other routes
                sessionStorage.setItem('authorized', true);
                history.push('/session');
              }else{
                alert(data.message);
              }
          })
          .catch(err => console.log(err));
          

      };
      
      // calling function
      login();
    
      };

      if(!sessionStorage.getItem('authorized')){
        return (
          <div>
              
              <form >
                  <div>
                      <label for="email">Email</label>
                      <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required/>
                  </div>
                  <div>
                      <label for="password">Password</label>
                      <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required/>
                  </div>
                  <button onClick={handleOnClick}>Login</button>
                  
              </form>
              <Link to="/register">Register</Link>
          </div>
        )
      }else {
        
        return(
          <Redirect to="/session"/>
        )
      }
    
}

export default Login
