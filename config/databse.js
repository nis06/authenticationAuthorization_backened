const mongoose=require('mongoose')
require('dotenv').config()



const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>{console.log("DB connection sucessfull")})
    .catch((e)=>{console.log("Error in connecting databse")
            process.exit(1)        
    })
}

module.exports=dbConnect;