import React, { useState } from 'react'
import '../styles/register.css'
import { Link, useNavigate } from 'react-router-dom'
import {saveUser} from '../services/api.js'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

  const [pass, setPass]=useState(false);
  const initialValue={
    name:"",
    email:"",
    password:""
  }

  const [user, setUser]=useState(initialValue);

  const navigate=useNavigate();
  
  const showPassword=()=>{
    if(pass===true){
      setPass(false);
    }else{
      setPass(true);
    }  
  }

  // const []

  const userSave=async(e)=>{
    e.preventDefault();
    if(user.email===""){
      toast.error("Enter your email !");
    }else if(!user.email.includes('@')){
      toast.error("Enter Valid email !")
    }else if(user.name===""){
      toast.error("Enter your Name!");
    }else if(user.password===""){
      toast.error("Enter Your Password!");
    }else{
      const response=await saveUser(user);
      console.log(response);
      if(response.status===200){
        navigate('/');
      }else{
        console.log("Error in saving data");
        // toast.error(response.response.data.error);
      }
    }
  }

  const handleChange=(e)=>{
    setUser({...user, [e.target.name]:e.target.value});
  }

  return (
    <>
      <div className='row' style={{width: "100%", float:"left"}}>
        <div className='col-sm-3'></div>
        <div className='col-sm-6'>
          <div className='container' id="container1">
            <div className='box1'  style={{textAlign:"center"}}>
              <div className='welcome'>Sign Up</div>
              <div className='glad'>We are glad that you are using Project Cloud to manage your tasks! We hope that you will get it.</div>
            </div>
            <form className='form'>
              <div className='form-group'>
                <label for="name" style={{marginBottom:".5rem"}}>Name:</label>
                <input className='form-control' onChange={(e)=>handleChange(e)} type='text' name="name" placeholder='Enter Your Name'/>
              </div>
              <div className='form-group'>
                <label for="name" style={{marginBottom:".5rem",marginTop:".5rem"}}>Email:</label>
                <input className='form-control' onChange={(e)=>handleChange(e)} type='email' name="email" placeholder='Enter Your Email'/>
              </div>
              <div className='form-group'>
                <label for="name" style={{marginBottom:".5rem", marginTop:".5rem"}}>Password:</label>
                <div className='two'>
                  <input className='form-control' onChange={(e)=>handleChange(e)} type={!pass?"password":"text"} name="password" placeholder='Enter Your password' />
                  <div className='showpass' onClick={()=>showPassword()}><VisibilityIcon/></div>
                </div>
                <div className='icon'></div>
              </div>
              <div className='btn btn-dark' id="btn1" onClick={(e)=>userSave(e)}>Submit</div>
              <div className='already' style={{marginTop:"1rem", textAlign:"center"}}>Already have an account?<Link style={{textDecoration:"none", color:"blue"}} to="/"> Log In</Link></div>
            </form>
          </div>
        </div>
        <div className='col-sm-3'></div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default Register