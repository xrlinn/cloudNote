const mongoose = require("mongoose")
const articleSchem= new mongoose.Schema({
    title: String,
    content:String,
    contentText:String,
    author:{
      ref:"user",
      type:mongoose.Schema.Types.ObjectId
    },
    category:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"category",
      required:true
    }],
    looksnum: {
      type:Number,
      default:0
    },
    commons:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"commons"
    }]
  },{versionKey:false,timestamps:{createdAt:"createtime",
  updatedAt:"updatetime"}
});

module.exports = mongoose.model('article', articleSchem);
