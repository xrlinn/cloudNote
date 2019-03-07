var mongoose = require("mongoose")
var users= new mongoose.Schema({
    name:String,
    email: {
        unique:true,
        type:String
    },
    pwd:{
      type:String,
      required:true,
    },
    avatar:{
      type:String,
      default:"http://pbl.yaojunrong.com/avatar1.jpg"
    }
  },{versionKey:false,timestamps:{createdAt:"createtime",
  updatedAt:"updatetime"}
});

var user= mongoose.model('user', users);
module.exports = user