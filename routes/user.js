const express=require('express')
const router=express.Router()

//import contoller
const {signUp,login}=require('../controller/auth')
const {auth,isStudent,isAdmin}=require('../middleware/auth')

router.post('/login',login)
router.post('/signup',signUp)

//Proteted route
router.get("/test",auth,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to test dashboard"
    })
})

router.get("/student",auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to student dashboard"
    })
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
        message:"welcome to Admin dashboard"
    })
})

module.exports=router;