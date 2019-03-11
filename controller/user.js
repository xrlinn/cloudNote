const Router = require("express");
const router = Router();
const userModel = require("../models/user");
const isEmail = require("validator/lib/isEmail")

router.post("/register", (req, res) => {
    const {name, pwd, email} = req.body;
    // 第一步： 检查email是否重复
    // 第二步：如果不重复则创建，重复则返回错误信息
    // const userData = null;
    userModel.findOne({email}).then(data => {
        // userData = data;
        if(data){ // 登录的邮箱重复了
            res.json({
                code: 400,
                msg: "邮箱已经被注册了",
                // data: null
            })
        } else {
            if(isEmail(email)){
                userModel.create({
                    name,
                    pwd,
                    email
                }).then(result => {
                    res.json({
                        code: 200,
                        msg: "注册成功"
                    })
                }).catch(err => {
                    res.json({
                        code: 500,
                        msg: err
                    })
                })
            }else {
                res.json({
                    code:401,
                    msg:"该邮箱格式不正确"
                })
            }
        }
    })
});

router.post("/login", async(req, res, next) => {
    // 第一步: 先去找有没有这个邮箱；
    // 第二步： 如果有，判断密码对不对，如果没有告诉用户不存在该用户
    // 第三步： 如果密码正确，登录通过，并将用户的session信息改变。如果不正确，告诉用户

    try{
        const {email, pwd} = req.body;
        const user = await userModel.findOne({
            email
        })
        if(user){ // 找得到用户
            if(pwd == user.pwd){ // 密码正确
                req.session.user = user;
                res.json({
                    code: 200,
                    data: {
                        avatar: user.avatar,
                        email: user.email,
                        name: user.name
                    },
                    msg:"登录成功"
                })
            } else { // 密码不正确
                res.json({
                    code: 400,
                    msg: "密码错误"
                })
            }
        } else { // 找不到用户
            res.json({
                code: 400,
                msg: "该邮箱尚未注册"
            })
        }
    } catch(err){
        next(err)
    }
})

router.get("/session",(req,res,next) => {
    res.send(req.session.user)
    res.end()
})

router.delete('/logOut', (req, res) => {
    req.session.destroy(function (err) {
        if(err){
            console.log(err)
        }
        else {
            res.clearCookie('sid');
            res.json({
                code: 200,
                msg: '退出登陆成功'
            })
        }
    })
})

module.exports = router;