import User from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import userotp from '../models/userOtp.js'
import nodemailer from 'nodemailer'

// email config
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth:{
        user: 'vilma43@ethereal.email',
        pass: 'qkFp1EBY7AwNHaCeTd'
    }
})


export const userRegister=async(request, response)=>{
    try{
        const preuser=await User.findOne({email: request.body.email})
        if(preuser){
            return response.status(400).json({msg: "user already exist"});
        }else{
            const hasspass=await bcrypt.hash(request.body.password, 12);
            const user=({name: request.body.name, email:request.body.email, password:hasspass})
            const newuser=new User(user);
            await newuser.save();
            return response.status(200).json({msg:"user save successfully", status:200})
        }
    }catch(error){
        return response.status(501).json({error:error.message})
    }
}

export const userOtpSend=async (request, response)=>{
    const email=request.body.email;
    if(!email){
        return response.status(404).json({error:"Please enter your mail"});
    }

    try{
        const res=await User.findOne({email: request.body.email});
        if(!res){
            return response.status(404).json({error:"Email doesn't exist"});
        }else{
            const OTP=Math.floor(100000+Math.random()*900000);
            // console.log(OTP);
            const existEmail=await userotp.findOne({email:request.body.email});

            if(existEmail){
                const updateData=await userotp.findByIdAndUpdate({_id:existEmail._id},{otp:OTP},{new:true});

                await updateData.save();

                const mailoption={
                    from:'vilma43@ethereal.email',
                    to:email,
                    subject:"OTP verification",
                    text:`Your OTP for login verification is: ${OTP}`
                }

                transporter.sendMail(mailoption,(error, info)=>{
                    if(error){
                        console.log(error)
                        response.status(400).json({error:"email not send"})
                    }else{
                        console.log("email send", info.response)
                        return response.status(200).json({message:"email sent successfully",status:200});
                    }
                })
            }else{
                const newdata=({email:email, otp:OTP});
                const newotp=new userotp(newdata);
                
                await  newotp.save();

                const mailoption={
                    from:'vilma43@ethereal.email',
                    to:email,
                    subject:"OTP verification",
                    text:`Your OTP for login verification is: ${OTP}`
                }

                transporter.sendMail(mailoption,(error, info)=>{
                    if(error){
                        console.log(error)
                        response.status(400).json({error:"email not send"})
                    }else{
                        console.log("email send", info.response)
                        return response.status(200).json({message:"email sent successfully",status:200});
                    }
                })
            }

        }
    }catch(error){
        return response.status(500).json({error: error});
    }
}


export const userOtpVerify=async(request, response)=>{
    const {email, otp}=request.body;
    // console.log(email);
    // console.log(otp);

    if(!email || !otp){
        return response.status(404).json({message:"Please enter your email and OTP !"})
    }

    try{
        const getotp=await userotp.findOne({email:email});

        if(getotp.otp===otp){
            const preuser=await User.findOne({email: email});

            //token generate
            const token=await preuser.generateAuthtoken();
            // console.log(token);
            return response.status(200).json({message:"User Login Successfully", status:200,userToken:token});
        }else{
            return response.status(400).json({error:"Invalid otp", status:400});
        }
    }catch(error){
        return response.status(400).json({error:error.message});
    }
}