import React from 'react';
import { useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Registration from '../signup/Registration';
import './login.css';

const Login = () => {

  const [username, setUsername] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [userError, setUserError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  async function loginuser(event) {
    // setLoading(true)
    event.preventDefault();
    console.log("im loign clicked");
  setLoading(true);
    if (username.length === 0) {
      setUserError("please enter username");
      console.log("password is valid");
    } 
    if (password.length === 0) {
      setUserError("password is required");
      // return ; 
    } 
    if (username.length > 0 && password.length > 0) {
      console.log("login function called reat js")
       await fetch("http://localhost:3005/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((resp) => resp.json()).then((data) => {
        // console.log(data.result.);
        // navigate('/');
        console.log(data);
      
        if (data.status === 201) {
          console.log(data.status);
          console.log(data.result.user._id);
          window.localStorage.setItem("token", data.result.token);
          window.localStorage.setItem("id", data.result.user._id);
          setPassword("");
          setUsername("");
          // window.localStorage.setItem("user",data.result.user._id);
          // console.log(data.result.token);
          // console.log(data.result.user_id);
          // console.log("local user "+JSON.parse(window.localStorage.getItem("user")));
          // console.log("local token "+window.localStorage.getItem("token"));
          
          setUserError("");
          navigate('/');
        } else {
          setPassword("");
          setUsername("");
          setUserError("Invalid Credentials. Please try again");
        }
       
      }).catch((err) => {
        setPassword("");
        setUsername("");
        setUserError("Invalid Credentials. Please try again");
      });

      console.log()
      // // console.log(resp.result);
      // if(resp.status ===201){


      //   // localStorage.setItem("userdatatoken",resp.result.token); 
      //   // console.log(resp.user);
      //   // console.log(resp);
      //   navigate('/');
      //   // setUserError("");
      //   // console.log(resp.json().user);
      // }else{
      //   setUserError("Invalid Credentials. Please try again");
      // }
    }
    // setLoading(false)
    // const data = await response.json()
    setLoading(false);

  }


  return (
    <div className='container'>
    {
      loading?<span>Loading...</span>:
      <div className='login'>
        <div className='col-6 offset-3 header_text'>
        <span>Login</span>
      </div>
      <form onSubmit={loginuser}>
        <div className='col-6 col-md-7 col-xl-7 offset-xl-3 col-xl-6 offset-md-3 offset-3 error_msg'>
          <span>{userError}</span>
        </div>
        <div className='row input_box'>
          <div className='col-3 offset-1 col-sm-3 offset-sm-1 col-md-3 offset-md-2 col-lg-3 offset-md-2 label'>Username &nbsp;:&nbsp;
          </div>
          <div className='col-6 col-sm-6 col-md-4 col-lg-3 input'>
            <input type="text" placeholder="" onChange={e => setUsername(e.target.value)} />
            {/* <span>{passwordErr}</span> */}
          </div>
        </div>
        <div className='row input_box'>
          <div className='col-3 offset-1 col-sm-3 offset-sm-1 col-md-3 offset-md-2 col-lg-3 offset-md-2 label'>Password &nbsp;:&nbsp;
          </div>
          <div className='col-6 col-sm-6 col-md-4 col-lg-3 input'>
            <input type="password" placeholder="" onChange={e => setPassword(e.target.value)} />
            <div className='forgot_password'>
              <span onClick={() => navigate("/forgotpassword")}>Forgot Password</span>
            </div>
          </div>
        </div>

        <div className='row d-flex flex-column btn_container'>
          <div className='col d-flex justify-content-center'>
            <div className='login_btn'><input type="submit" value="login" /></div>

          </div>
          <div className='col align-self-center text-center signup_link_container'>
            <span className='is_sign_up'>Not signed up yet? <span className='sign_up_link' onClick={() => navigate("/signup")}>click here</span> to sign up</span>
          </div>

        </div>
      </form>
      </div>
    }
    
    </div>
  )
}

// mongodb+srv://debobroto:<password>@cluster0.hsydmt2.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://debobroto:debobroto@cluster0.hsydmt2.mongodb.net/?retryWrites=true&w=majority

export default Login