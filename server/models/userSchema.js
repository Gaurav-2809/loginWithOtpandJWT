import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const SECRET_KEY='qwertyuioplkjbnm';

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
            type: String,
            required: true
            }
        }
    ]
})

userSchema.methods.generateAuthtoken=async function(){
    try{
        let newtoken=jwt.sign({_id:this._id}, SECRET_KEY, {
            expiresIn:"1d"
        });

        this.tokens=this.tokens.concat({token: newtoken});
        await this.save();
        return newtoken;
    }catch(error){
        return response.status(400).json({error: error});
    }
}

const user=mongoose.model('userdetails', userSchema);
export default user;