
import { commonrequest } from './apicall'
const URL="http://localhost:4002"

export const saveUser=async(data)=>{
    return await commonrequest("POST", `${URL}/register`,data);
}

export const sendOtpFunction=async(data)=>{
    return await commonrequest("POST", `${URL}/otpsend`,data);
}

export const verifyOtpFunction=async(data)=>{
    return await commonrequest("POST", `${URL}/otpverify`,data);
}