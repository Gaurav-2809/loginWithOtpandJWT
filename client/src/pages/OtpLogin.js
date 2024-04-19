import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { verifyOtpFunction } from '../services/api';



const OtpLogin = () => {

    const [otp, setOtp] = useState("");
    const location=useLocation();
    const navigate=useNavigate();

    console.log(location);

    const onValueChange=(e)=>{
        setOtp(e.target.value);
        console.log(otp)
    }

    const LoginUser=async(e)=>{
        e.preventDefault();

        if(otp===""){
            toast.error("Please enter OTP!");
        }else if(otp.length !==6){
            toast.error( "OTP must be of length 6.");
        }else{
            const data={
                otp, email:location.state
            }
            const response=await verifyOtpFunction(data);
            if(response.status===200){
                localStorage.setItem("userdbtoken", response.userToken);
                toast.success(response.message);
                setTimeout(()=>{
                    navigate('/dashboard')
                },5000)
            }else{
                // console.log(response);
                toast.error(response.response.data.error);
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
                                <p>Please Enter your OTP</p>
                            </div>
                        </div>
                        <form className='form'>
                            <div className='form-group'>
                                <label for="otp" style={{marginBottom:".5rem"}}>OTP:</label>
                                <input type="text" name="otp" onChange={(e)=>onValueChange(e)}  placeholder='Enter your otp' className="form-control"/>
                            </div>
                            <div className='btn btn-dark' id="btn1" onClick={(e)=>LoginUser(e)}>Submit</div>
                        </form>
                    </div>
                </div>
                <div className='col-sm-3'></div>
            </div>
            <ToastContainer />
        </>
    )
}

export default OtpLogin