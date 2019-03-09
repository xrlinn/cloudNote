const Router = require("express");
const router = Router();
const articleModel = require("../models/article");
const mongoose = require("mongoose")

const userRouters = require("./user")
const articleRouters = require("./article")


router.get("/",(req,res) => {
    // res.sendFile(path.join(__dirname,"../public/page/index.html"));
    res.render("index");
})
router.get("/write",(req,res) => {
    // res.sendFile(path.join(__dirname,"../public/page/write.html"));
    res.render("write")
})
router.get("/register",(req,res) => {
    // res.sendFile(path.join(__dirname,"../public/page/register.html"));
    res.render("register")
})
router.get("/content",(req,res) => {
    // res.sendFile(path.join(__dirname,"../public/page/content.html"));
    res.render("content")
})

router.get("/contents",async(req,res,next) => {
    try{
        const id = req.query.id;
        const article = await articleModel
        .findById(id)
        .populate({
            path:"author",
            select:"-pwd -email"
        })
        await article.update({$inc:{
            looksnum:1
        }})
        res.json({
            code:200,
            data:article
        })
    }catch(err){
        next(err)
    }
})


router.use("/user",userRouters);
router.use("/article",articleRouters);
module.exports = router;