const express=require('express')
const router=express.Router();
const database=require('../../database/database')
const {responseHandler} = require("../../utils");
const {query, validationResult, matchedData, body, param} = require("express-validator");
const mw=require('../../middleware/admin')
router.use(mw)

///// get all category
router.get('/',(req,res)=>{
    const id=req.query.id;
    if(id){
        database('coupons').select('*').where({id}).then(response=>{
            res.status(200).send(responseHandler(false,null,response[0]))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }else{
        database('coupons').select('*').then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }

})

//// is coupons valid
router.get('/valid',query('code').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('coupons').select('*').where({code:query.code}).then(response=>{
            if(response.length>0){
                res.status(200).send(responseHandler(false,null,{
                    valid:true,
                    ...response[0]
                }))
            }else{
                res.status(200).send(responseHandler(false,null,{valid:false}))
            }
        }).catch(err=>{
            res.status(503).send('error in db!')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }

})

////// add a coupon
router.post('/',query(['code','percent','expired_at']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('coupons').
        insert(query).
        then(response=>{
            res.status(200).send(responseHandler(false,'coupons added',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})

////// remove a coupon
router.delete('/',query('id').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const query = matchedData(req);
        database('coupons').
        where({id:query.id}).
        del().
        then(response=>{
            res.status(200).send(responseHandler(false,'coupons removed',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})

////// update a coupon
router.put('/:id',param('id').notEmpty(),query(['code','percent','expired_at']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if (result.isEmpty()) {
        const data = matchedData(req);
        database('coupons').
        where({id:data.id}).
        update(data).
        then(response=>{
            res.status(200).send(responseHandler(false,'coupons updated',null))
        }).catch(err=>{
            res.status(503).send('error in db')
        })
    }else{
        res.status(200).send(responseHandler(true,result.array() ,null));
    }
})

module.exports=router