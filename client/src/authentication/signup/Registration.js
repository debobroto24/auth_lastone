import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
// import Axios from 'axios';
import PasswordStrength from "../PasswordStrength";
import "./test.css";
const Registration = () => {
  const navigate = useNavigate();
  // const navigateto =()=>{
  //   navigate('../signin/login', { replace: true });
  // }
  const [password, setPassword] = useState("");
  const [okpassword, setOkpassword] = useState(false);
  const [passwordErr, setPasswordErr] = useState("");
  const [firstname, setFirstname] = useState("");
  const [okfirstname, setOkFirstname] = useState(false);
  const [firstnameErr, setFirstnameErr] = useState("");
  const [lastname, setLastname] = useState("");
  const [oklastname, setOklastname] = useState(false);
  const [lastnameErr, setLastnameErr] = useState("");
  const [username, setUsername] = useState("");
  const [okusername, setOkusername] = useState(false);
  const [usernameErr, setUsernameErr] = useState("");
  const [email, setEmail] = useState("");
  const [okemail, setOkemail] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [okconfirmPassword, setOkconfirmPassword] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const [validusername, setValidusername] = useState(false);
  const [timer, setTimer] = useState(null);
  // const [okUserName , setOkUserName] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (username) getUserName();
    }, 1500);
    return () => clearTimeout(timer);
  }, [username]);

  async function getUserName() {
    const res = await fetch("http://localhost:3005/checkusername", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
      }),
    });
    console.log("res is " + res);
    if (res.status === 401) {
      setValidusername(true);
      console.log(username + " its not taken");
      console.log(res.data);
      setUsernameErr("");
      setOkusername(true);
    }
    if (res.status === 201) {
      console.log(res.data);
      setUsernameErr("This username alwready taken");
      setValidusername(false);
      console.log(username + " this is taken");
      setOkusername(false);
    }

    // console.log(e.target.value);
  }

  async function registerUser(event) {
    console.log(okfirstname + oklastname + okusername + validusername + okemail +okpassword + okconfirmPassword);

    setLoading(true);
    console.log(email);
    event.preventDefault();
    console.log("im clicked");
    const regEx = /[a-zA-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{16,}$/;
    if(password.length === 0) {
      setPasswordErr("please enter password");
      setOkpassword(false);
      console.log("password is valid");
    }else if(!passwordReg.test(password)) {
      setPasswordErr("password is invalid");
      setOkpassword(false);
    }else{
      setPasswordErr("");
      setOkpassword(true);
    }


    if(confirmPassword.length === 0) {
      setConfirmPasswordErr("enter your password");
      setOkconfirmPassword(false);
    }else if(!passwordReg.test(confirmPassword)) {
      setConfirmPasswordErr("password is invalid");
      setOkpassword(false);
    }
    else if(confirmPassword !== password) {
      setConfirmPasswordErr("password and confirmed password not matched");
      setOkconfirmPassword(false);
    }else{
      setConfirmPasswordErr("");
      setOkconfirmPassword(true);
    }


    // const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(email.length === 0) {
      setEmailErr("email is required");
      setOkemail(false);
      // return ;
    }else if(!regEx.test(email)) {
      setEmailErr("Invalid email");
      setOkemail(false);
    }else{
      setEmailErr("");
      setOkemail(true);
    }

    if(username.length === 0) {
      console.log(username + " user name length");
      setUsernameErr("username is required");
      setOkusername(false);
    }else{
      setUsernameErr("");
      setOkusername(true);
    }
    if(firstname.length === 0) {
      setFirstnameErr("firstname is required");
      setOkFirstname(false);
    } else{
      setFirstnameErr("");
      setOkFirstname(true);
    }
    if(lastname.length === 0) {
      setLastnameErr("last name is required");
      setOklastname(false);
    } else{
      setLastnameErr("");
      setOklastname(true);
    }

    // if(firstnameErr.length===0 && lastnameErr.length===0 && usernameErr.length ===0 && emailErr.length ===0 && passwordErr.length ===0 && confirmPasswordErr.length ===0 && setUsernameErr.length ===0){
    if(okfirstname && oklastname && okusername && validusername && okemail &&okpassword && okconfirmPassword){
      await fetch("http://localhost:3005/registration", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }),
      })
        .then((res)=>res.json()).then((data) => {
          console.log(data, "userRegister");
          console.log(data.message);
          console.log(data);
          if (data.status === 401) {
            setFirstname("");
            setLastname("");
            setConfirmPassword("");
            setPassword("");
            setEmail("");
            setUsername("");
            setPassword("");
            setEmailErr(data.message);
          }
          if (data.status === 201) {
            setFirstname("");
            setLastname("");
            setConfirmPassword("");
            setPassword("");
            setEmail("");
            setUsername("");
            setPassword("");
            navigate("/login");
          }
        })
        .catch((e) =>{
          setFirstname("");
          setLastname("");
          setConfirmPassword("");
          setPassword("");
          setEmail("");
          setUsername("");
          setPassword("");
        });
    }
     
    else {
      console.log("not fetcing");
    }
console.log(okfirstname + oklastname + okusername + validusername + okemail +okpassword + okconfirmPassword);
    setLoading(false);

    // if()
  }

  console.log(passwordErr);
  console.log("passwowrd isid "+ password);
  console.log(passwordErr);
  console.log(confirmPasswordErr);
  console.log("capss "+confirmPassword)

  // console.log("rect username: ",username);

  return (
    <div className="cus-container singup">
      {loading ? 
        <span>Loading...</span>
      : 
        <form onSubmit={registerUser}>
          <div className="test">
            <div className="col-12 header_text">Signup</div>
            <div className="row input-box">
              <div className="col-3 offset-1 col-sm-2 col-md-2  col-lg-2 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label">
                <span>First Name :&nbsp;</span>
              </div>
              <div className="col-7 col-sm-5   col-md-6 col-lg-4 col-xl-4  input">
                <input
                  type="text"
                  placeholder="first name"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <div className="error_msg">{firstnameErr}</div>
              </div>
            </div>

            <div className="row input-box">
              <div className="col-3 offset-1 col-sm-2 col-md-2  col-lg-2 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label">
                <span>last Name :&nbsp;</span>
              </div>
              <div className="col-7 col-sm-5   col-md-6 col-lg-4 col-xl-4  input">
                <input
                  type="text"
                  placeholder="last name"
                  onChange={(e) => setLastname(e.target.value)}
                />
                <div className="error_msg">{lastnameErr}</div>
              </div>
            </div>

            {/* username  */}
            <div className="row input-box">
              <div className="col-3 offset-1 col-sm-2 col-md-2  col-lg-2 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label">
                <span>Username :&nbsp;</span>
              </div>
              <div className="col-7 col-sm-5   col-md-6 col-lg-4 col-xl-4  input">
                {/* <input type="text" placeholder="firstlast" onChange={UsernameCheck} /> */}
                <input
                  type="text"
                  placeholder="firstlast"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="error_msg">{usernameErr}</div>
              </div>
            </div>

            <div className="row input-box">
              <div className="col-3 offset-1 col-sm-2 col-md-2  col-lg-2 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label">
                <span>Email :&nbsp;</span>
              </div>
              <div className="col-7 col-sm-5   col-md-6 col-lg-4 col-xl-4  input">
                <input
                  type="text"
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="error_msg">{emailErr}</div>
              </div>
            </div>

            <div className="row input-box password_container">
              {/* <div className='col-md-1  empty'></div> */}
              <div className="col-3 offset-1 col-sm-2 col-md-2  col-lg-2 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label">
                <span>Password :&nbsp;</span>
              </div>
              <div className="col-7 col-sm-5   col-md-6 col-lg-4 col-xl-4  input">
                <input
                  type="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <PasswordStrength password={password} />
              </div>

              {/* password_hints  */}
              <div className="col-sm-12 col-md-3 col-lg-4 col-xl-4">
                <div className="row password">
                  {/* <div className='col-md-3 col-3 col-sm-3 col-md- display-none'> display none</div> */}
                  <div className="password_hint col-7 offset-3 col-sm-5 offset-sm-3 col-md-12 offset-md-3   col-lg-12 col-xl-12  ">
                    <span>password must be</span>
                    <ul>
                      <li>minimum 16 character</li>
                      <li> contain a specail character and a number</li>
                      <li>
                        {" "}
                        contain at least one uppercase and one lowercase
                        character
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* confirmed password */}
              <div className="col-12">
                <div className="row confirm-password">
                  <div className="col-3 offset-1 col-sm-2 col-md-2  col-lg-2 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label">
                    <span>Confirm password :&nbsp;</span>
                  </div>
                  <div className="col-7 col-sm-5   col-md-6 col-lg-4 col-xl-4  input">
                    <input type="password" placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <div className="error_msg">{confirmPasswordErr}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-7 offset-4 col-sm-5 offset-sm-3 offset-lg-4 col-lg-4 col-md-6 offset-md-3 col-lg-4 col-xl-4 offset-xl-4 button-box">
                <div className="signup-btn">
                  <input type="submit" value="Sign up" />
                </div>
                <div
                  className="login-btn"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </div>
  );
};

export default Registration;
