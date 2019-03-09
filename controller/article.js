const Router = require("express");
const router = Router();
const articleModel = require("../models/article");
const mongoose = require("mongoose")
router.post("/",async(req,res,next) => {
    try{
        let {
            title,
            contentText,
            category,
        } = req.body;
        if (req.session.user){
            await articleModel.create({
                title,
                contentText,
                category,
                author:mongoose.Types.ObjectId(req.session.user._id)
            })
            res.json({
                code:200,
                msg:"文章创建成功"
            })
        }else {
            res.json({
                code:401,
                msg:"未登录不能发表笔记"
            })
        }


    } catch(err){
        next(err)
    }
})

router.get("/",async(req,res,next) => {
    try{
        let{pn=1,size=10} = req.query;
        pn = Number(pn);
        size = Number(size);
        const articles = await articleModel
        .find()
        .limit(size)
        .skip((pn-1)*size)
        .sort({_id:-1})
        .populate({
            path:"author",
            select:"-email -pwd"
        })
        res.json({
            code:200,
            data:articles
        })
    }catch(err){
        next(err)
    }
})



module.exports = router;