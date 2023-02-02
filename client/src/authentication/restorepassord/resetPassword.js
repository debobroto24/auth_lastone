import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Route, Routes, json } from 'react-router-dom';
import Registration from '../signup/Registration';
import "./resetpass.css";

const ResetPassword = () => {
  const [cpassword, setCpassword] = useState('');
  const [cpasswordErr, setCpasswordErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [message, setMessage] = useState('');
  const [loading,setLoading] = useState(false);


  const [isOk, setIsOk] = useState(false);
  const navigate = useNavigate();

  const { id, token } = useParams();
  const userValid = async () => {
    const res = await fetch(`http://localhost:3005/checkuser/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.status === 201) {
      setMessage(res.message);
      console.log("user valid");
    } else {
      navigate('./error');
      // console.log("not valid");
    }
  }
  useEffect(() => {
    userValid();
    
  }, []);

  const sendpassword = async (e) => {
    setLoading(true);
    e.preventDefault();
    const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{16,}$/;
    if (password.length === 0) {
      setMessage("please enter password");
      console.log("password is valid");
    } else if (!passwordReg.test(password)) {
      setMessage("password is invalid");
      console.log("password is invalid");
    } else if (!passwordReg.test(cpassword)) {
      setMessage("invalid confirm password");

    }
    else if (cpassword.length === 0) {
      setMessage("Enter confirm password");
    }
    else if (cpassword !== password) {
      setMessage("password and confirmed password are not matched");
    } else {
    
       await fetch(`http://localhost:3005/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }).then((res)=>res.json()).then((data)=>{
        if (data.status === 201) {
            setPassword("");
            setCpassword("");
            setMessage("password change successfully");
            console.log("user valid");
            alert("password change successfully");
            navigate('/');
          } else {
            console.log("somethisn wrong" + data.message);
            setMessage(data.message)
            // navigate('./error');
            // console.log("not valid");
          }
      }).catch((e)=>{
        setMessage("password not changed");
      });
      
     
    }
    setLoading(false);

  }




  return (
    <div className='resetpass container'>
     {
      loading?<span>Loading...</span>: 
      <form onSubmit={sendpassword}>
      <div className="row input-box">
        <div className='col-12 header_text'>Reset Password</div>
        <div className='col-12 message'>{message}</div>
        <div className='col-3 offset-1 col-sm-3 col-md-3  col-lg-3 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label'>
          <span>New Password :&nbsp;</span>
        </div>
        <div className='col-7 col-sm-5   col-md-5 col-lg-4 col-xl-4    input'>

          <input type="text" onChange={e => setPassword(e.target.value)} />
        </div>
      </div>

      <div className="row input-box">
        <div className='col-3 offset-1 col-sm-3 col-md-3  col-lg-3 offset-md-1 offset-lg-2 offset-sm-1 col-xl-2 offset-xl-2 label'>
          <span>confirm Password :&nbsp;</span>
        </div>
        <div className='col-7 col-sm-5   col-md-5 col-lg-4 col-xl-4  input'>

          <input type="text" onChange={e => setCpassword(e.target.value)} />
        </div>
      </div>
      <div className="row btn">
        <div className='d-flex button-box '>
          <input type="submit" value="set password" />
        </div>
      </div>
    </form>
     }
    </div>
  )
}

// mongodb+srv://debobroto:<password>@cluster0.hsydmt2.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://debobroto:debobroto@cluster0.hsydmt2.mongodb.net/?retryWrites=true&w=majority

export default ResetPassword

// <div className='col-sm-12 col-md-3 col-lg-4 col-xl-4'>
// <div className='row password'>
//   {/* <div className='col-md-3 col-3 col-sm-3 col-md- display-none'> display none</div> */}
//   <div className='password_hint col-7 offset-3 col-sm-5 offset-sm-3 col-md-12 offset-md-3   col-lg-12 col-xl-12  '>
//     be minimum 16 charactercontain a specail character and a number
//     contain at least one uppercase and one lowercase character


//   </div>
// </div>
// </div>