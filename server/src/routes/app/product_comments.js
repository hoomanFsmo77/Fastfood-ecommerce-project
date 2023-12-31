const express=require('express');
const router=express.Router();
const database=require('../../database/database');
const {body, validationResult, matchedData, query, param} = require("express-validator");
const {responseHandler,changeToBoolean,addImageBase, pagination} = require("../../utils");
const mw=require('../../middleware/profile')
router.use(mw)

/////  add comment
const addCommentBodyValidation=()=>body(['date','productID','rating','body']).notEmpty();
router.post('/',addCommentBodyValidation(),body(['isReply','replyID']).optional(),async (req,res)=>{
    const token=req.headers.token
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const body = matchedData(req);
        const userData=await database('users').select('id').where({token});
        database('product_comments').
        insert({
            ...body,
            userID:userData[0].id
        }).
        then(response=>{
            res.status(200).send(responseHandler(false,'comment added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }
})



///  get comment by userID
router.get('/user',query(['page','per']).optional(),async (req,res)=>{
    const token=req.headers.token
    const result = validationResult(req);
    if(result.isEmpty() ) {
        const data = matchedData(req);
        const page=Number(data?.page) || null;
        const per_page=Number(data?.per) || 6;
        const userData=await database('users').select('id').where({token});
        database('product_comments').
        join('product','product_comments.productID','=','product.id').
        join('users','product_comments.userID','=','users.id').
        select('product_comments.*','product.title as product_title','product.link as product_link','product.primary_image as product_image','users.firstname as author_firstname','users.lastname as author_lastname','users.username as author_username').
        where('product_comments.userID','=',Number(userData[0].id)).
        then(response=>{
            const imageFilter=addImageBase(response,'product_image')
            const booleanFilter=changeToBoolean(imageFilter,['isAccept','isReply'])
            res.status(200).send(responseHandler(false,null,pagination(booleanFilter,page,per_page,req.originalUrl,'comments')))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})


module.exports=router
