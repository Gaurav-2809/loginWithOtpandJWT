import mongoose from 'mongoose'

const Connection=async (username, password)=>{
    const URL=`mongodb+srv://${username}:${password}@blog-post.zxt3l7d.mongodb.net/otpapplication?retryWrites=true&w=majority&appName=blog-post`

    try{
        await mongoose.connect(URL,{useNewUrlParser: true})
        console.log("Database connected successfully")
    }catch(error){
        console.log(error)
    }
}

export default Connection;