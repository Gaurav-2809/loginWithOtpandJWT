import React, { useState } from 'react'
import '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { sendOtpFunction } from '../services/api'



const Login = () => {

    const [email,setEmail]=useState("");

    const navigate=useNavigate();

    const onEmailChange=(e)=>{
        setEmail(e.target.value);
        console.log(email);
    }

    const sendOtp=async(e)=>{
        e.preventDefault();
        console.log("hello")
        if(email===""){
            toast.error("Enter your email !");
        }else if(!email.includes('@')){
            toast.error("Enter Valid email !")
        }else{
            const data={email: email}
            const response=await sendOtpFunction(data);
            console.log(response);
            if(response.status===200){
                navigate('/otp', {state: email})
                toast.success("OTP send Successfully")
            }
        }
    }

  return (
    <>
        <div className='row' style={{width: "100%", float:"left"}}>
            <div className='col-sm-3'></div>
            <div className='col-sm-6'>
                <div className='container' id="container1">
                    <div className='box1'  style={{textAlign:"center"}}>
                        <div className='welcome'>
                            <p>Welcome Back, Log In</p>
                        </div>
                        <div className='glad'>
                            <p>Hi, we are glad you are back, Please Login</p>
                        </div>
                    </div>
                    <form className='form'>
                        <div className='form-group'>
                            <label for="email" style={{marginBottom:".5rem"}}>Email:</label>
                            <input type="email" onChange={(e)=>onEmailChange(e)} placeholder='Enter your email address' className="form-control"/>
                        </div>
                        <div className='btn btn-dark' onClick={(e)=>sendOtp(e)} id="btn1">Submit</div>
                    </form>
                    <div className='account'>
                        Don't have an account? <Link to="/register" style={{textDecoration:"none", color:"blue"}}>Sign Up</Link>
                    </div>
                </div>
            </div>
            <div className='col-sm-3'></div>
        </div>
        <ToastContainer />
    </>
  )
}

export default Login