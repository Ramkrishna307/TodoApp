const mongoose = require('mongoose');
const Schema=mongoose.Schema


const userSchema=new Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,

  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
    unique:true,
  }
})

// const varModel=mongoose.model('user',userSchema);
// module.exports=varModel;
module.exports=mongoose.model('user',userSchema);