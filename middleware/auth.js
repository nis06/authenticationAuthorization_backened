
const jwt=require('jsonwebtoken')
require('dotenv').config()

exports.auth=(req,res,next)=>{
    try{
        //extract JET token
        //pending other ways to fetch token

        console.log('cookie::',req.cookies.token)
        console.log("body;;",req.body.token)
        console.log("header",req.header("Authorization"))
    

        const token =req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer","")

        if(!token){
            return res.status(401).json({
                success:false,
                message:"no token"
            })
        }

        //verify the token
        try{
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode)
            req.user=decode;
        }catch(e){
            return res.status(401).json({
                sucess:false,
                message:"not valid token"
            })
        }
        next();

    }
    catch(e){
        console.error(e);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying ",
    });
    }
}


exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=='Student'){
            return res.status(401).json({
                sucess:false,
                message:"Not a route for student"
            })
        }
        next();
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
          success: false,
          message: "user role is not matching",
        });
    }

}

exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=='Admin'){
            return res.status(401).json({
                sucess:false,
                message:"Not a route for student"
            })
        }
        next();
    }
    catch(e){
        console.error(e);
        return res.status(500).json({
          success: false,
          message: "user role is not matching",
        });
    }

}