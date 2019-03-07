const Router = require("express");
const router = Router();
const articleModel = require("../models/article");
const mongoose = require("mongoose")
router.post("/",async(req,res,next) => {
    try{
        let {
            title,
            content,
            contentText,
            category,
        } = req.body;
        category = category.map(item => 
            mongoose.Types.ObjectId(item)
        )
        if (req.session.user){
            await articleModel.create({
                title,
                content,
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
        .populate("category")
        res.json({
            code:200,
            data:articles
        })
    }catch(err){
        next(err)
    }
})

router.get("/content/:id",async(req,res,next) => {
    try{
        const {id} = req.params;
        const article = await articleModel
        .findById(id)
        .populate({
            path:"author",
            select:"-pwd -email"
        })
        .populate("category")
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
} )

module.exports = router;