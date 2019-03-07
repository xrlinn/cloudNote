const Router = require("express");
const router = Router();

const userRouters = require("./user")
const articleRouters = require("./article")
const categoryRouters = require("./category")
const path = require("path")

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


router.use("/user",userRouters);
router.use("/article",articleRouters);
router.use("/category",categoryRouters)
module.exports = router;