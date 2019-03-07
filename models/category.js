const mongoose = require("mongoose")
const categorySchem= new mongoose.Schema({
   name:String
  },{
        versionKey:false,timestamps:{createdAt:"createtime",
        updatedAt:"updatetime"}
});

module.exports = mongoose.model('category', categorySchem);