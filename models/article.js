const mongoose = require("mongoose")
const articleSchem= new mongoose.Schema({
    title: String,
    contentText:String,
    author:{
      ref:"user",
      type:mongoose.Schema.Types.ObjectId
    },
    category:String,
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
