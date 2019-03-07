const Router = require("express");
const router =Router();
const categoryModel = require("../models/category");

router.post("/",async(req,res,next) => {
    try{
        let {name} = req.body
        await categoryModel.create({name});
        res.json({
            code:200,
            msg:"分类创建成功"
        })
    }catch(err){
        next(err)
    }
})

router.get("/",async(req,res,next) => {
    try{
        const category = await categoryModel.find();
        res.json({
            code:200,
            category
        })
    }catch(err){
        next(err)
    }
})

module.exports = router