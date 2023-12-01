const express =require('express')
const app=express()

require('dotenv').config()
const Port=process.env.PORT || 4000

const cookieParser=require('cookie-parser')
app.use(cookieParser())
app.use(express.json())

const user=require("./routes/user")
app.use('/api/v1',user);





const dbConnection=require('./config/databse')
dbConnection();

app.listen(Port,()=>{
    console.log("App executed successfully")
})