import axios from "axios";


export const commonrequest=async(methods, url, body, header)=>{
    let config={
        method: methods,
        url,
        headers:header?header:{
            "Content_Type": "application/json"
        },
        data: body
    }
    try{
        let response=await axios(config);
        return response.data;
    }catch(error){
        return error;
    }
    
}