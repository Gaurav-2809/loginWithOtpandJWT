import mongoose from 'mongoose'

const userOtpSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    otp:{
        type: String,
        required: true
    }
})

const userotp=mongoose.model("userOtp", userOtpSchema);

export default userotp;