// var express = require('express');
// var router = express.Router();
// var userModel = require("../models/user")
// var noteModel = require("../models/note")

// router.post("/write",(req,res,next) => {
//   const {title,content} = req.body;
//   noteModel.create({title,content}).then(data => {
//     // console.log(data)
//     res.json({
//       code:200,
//       data
//     })
//   })
// })


// router.post("/register",(req,res,next) => {
//   const {name,email,pwd} = req.body;
//   userModel.create({name,email,pwd}).then(data => {
//     console.log(data)
//     res.json({
//       code:200,
//       data
//     })
//   })
// })

// router.get("/getdata",(req,res) => {
//   noteModel.find().then(data => {
//     res.json({
//       code:200,
//       data
//     })
//   })
// })

// router.post("/login",(req,res) => {
//   const {email,pwd} = req.body;
//   userModel.findone({email}).then(data => {

//     if(!data){
//       res.json({
//         code:401,
//         msg:"该用户不存在"
//       })
//       }
//       else if (data.pwd != pwd){
//         res.json({
//           code:401,
//           msg:"账号密码错误"
//         })
//     }
//     else if (data.pwd == pwd){
//       req.session.userModel = data;

//       let userMsg = {
//           username: data.username,
//           email: data.email
//       };
//       res.json({
//           code: 200,
//           data: userMsg,
//           msg: '登录成功'
//       })
//     }
//   })
// })

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index',{});
// });

// router.get("/write",(req,res,next) => {
//   res.render("write")
// })

// router.get("/content",(req,res,next) => {
//   res.render("content")
// })

// router.get("/register",(req,res,next) => {
//   res.render("register")
// })

// module.exports = router;
