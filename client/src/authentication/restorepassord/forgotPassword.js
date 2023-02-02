import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './forgotPassword.css';
const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  async function sendlink(event) {
    setLoading(true);
    console.log("send linked clicked");
    event.preventDefault();
    console.log("email is "+ email);
    if(email.length === 0){
      console.log("email length is 0");
      setError("Please enter your email");
    }else {
      console.log(email);
      const res = await fetch("http://localhost:3005/sendresetlink", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
        }),
      });
      console.log("im clicked");
      const data = await res.json();
      if (data.status === 201) {
        setEmail(""); setMessage(true);
      }else{
        setError("Password not sent. try again!");
        setMessage(false);
        setEmail("");
      }
   
    }
    setLoading(false);
  }
  return (
    <div className='container forgot-pass'>
      {
        loading? <span>Loading...</span>: 
        <form onSubmit={sendlink}>
        <div className='row input_box'>
           <div className='col-12 header_text'>Forgot Password</div>
           {/* <div className='col-12 message'>Forgot Password</div> */}
           <div className='col-12 message'>{message ? <span>passsword reset link send successfully</span> : <span class='error_message'>{error}</span>}</div>
           <div className='col-3 offset-1 col-sm-3 offset-sm-1 col-md-3 offset-md-2 col-lg-3 offset-md-2 label'>Email &nbsp;:&nbsp;
           </div>
           <div className='col-6 col-sm-6 col-md-4 col-lg-3 input'>
             <input type="text" placeholder="" onChange={e => setEmail(e.target.value)} />
           </div>
           <div className='col-4 offset-4 forgot-password-btn'><button><input type="submit" value="Send Reset Link" /></button></div>
         </div>
        </form>
      }
    </div>
  )
}

export default Forgotpassword ;