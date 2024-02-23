const express=require('express');
require('dotenv').config();
const mongoose = require('mongoose');
var clc = require("cli-color");
//file import
const {userDataValidation}=require("./utils/authUtil");
const userModel = require('./models/userModel');
//constant
const PORT=process.env.PORT

const app=express()
//MiddleWare
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json())
//db CONNECTION

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log(clc.bgBlueBright("Mongo DB connected successfully"));
}).catch((err)=>{
 console.log(err);
})

//API
app.get('/',(req,res)=>{
   res.send("Server is running")
})

app.get('/register',(req,res)=>{
//   console.log("Register page get");
return res.render("registerPage")
})

app.post('/register',async(req,res)=>{
      console.log(req.body);

      const{name,email,username,password}=req.body;

      //data validation

      
  try {
    await userDataValidation({ name, password, email, username });
  } catch (error) {
    return res.send({
      status: 400,
      message: "user data error",
      error: error,
    });
  }

      //cheak username and password present or not 
      //db entry
    const userObj=new userModel({
         //schema : client
    name: name,
    email: email,
    username: username,
    password: password,
    })

    
    


      return res.send("register in Successfully")
    
    })

app.get('/login',(req,res)=>{
    // console.log("login page get");
    return res.render("loginPage")

  })

  app.post('/login',(req,res)=>{
     console.log(req.body);

     return res.send("LOg in Successfully")
   
  })
app.listen(PORT,()=>{
    console.log(clc.yellow.underline.bold(`Server running: http://localhost:${PORT}/`));
})