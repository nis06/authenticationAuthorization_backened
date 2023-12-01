const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt=require("jsonwebtoken");
const { options } = require("../routes/user");
require('dotenv').config()

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //if user already exist

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "USER ALREADY EXISTS !",
      });
    }

    //SECURE PASS
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    //new user data
    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "uanable to signup try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation onn email and pass
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "fill the required details",
      });
    }
    //check for registered user
    let user = await User.findOne({ email });
    //if not registered user

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not a registered user",
      });
    }

    const payload={
        email:user.email,
        id:user._id,
        role:user.role
    }

    //verify pass & generate JWT token
    if(await bcrypt.compare(password,user.password)){
        //pass match
        let token=jwt.sign(payload,process.env.JWT_SECRET,
            {
                expiresIn:"2h"
            })
            user=user.toObject()
        user.token=token;
        user.password=undefined;
        console.log(user)
            const options={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true
            }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"user logged in sucessfully",
            token,
            user
        })
    }
    else{
        return res.status(403).json({
            success:false,
            message:"password does not match"
        })
    }

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "uanable to login ",
    });
  }
};
