const express=require('express');
const router=express.Router();
const database=require('../database/database')
const {body ,validationResult,matchedData, param,query} = require('express-validator');
const {responseHandler,addImageBase,changeToBoolean} = require("../utils");
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));


///////////////////////////////// middleware
router.use((req,res,next)=>{
    const token=req.headers.token
    if(token){
        database('users').select(['token','id']).where({token}).then(response=>{
            if(response.length>0){
                req.headers.id=response[0].id
                next()
            }else{
                res.status(200).send(responseHandler(true,'Unauthenticated',null))
            }
        })
    }else{
        res.status(200).send(responseHandler(true,'Unauthenticated',null))
    }
})
///////////////////////////
router.get('/info',(req,res)=>{
    const token=req.headers.token
    database('users').
    select('firstname','lastname','username','profile_image','phone','email','isAdmin').
    where({token}).
    then(response=>{
        const result=changeToBoolean(addImageBase(response,'profile_image'),'isAdmin')
        res.status(200).send(responseHandler(false,null,result[0]))
    })
})

router.post('/info',body(['firstname','lastname','username','phone']).notEmpty(),body('email').isEmail(),(req,res)=>{
    const token=req.headers.token
    const result = validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        database('users').
        update(body).
        where({token}).
        then(response=>{
            res.status(200).send(responseHandler(false,'user data updated',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

router.post('/address',body(['title','address','provinceID','cityID','postal_code','phone']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const body = matchedData(req);
        const userID=req.headers.id
        database('user_address').
        insert({...body,userID}).
        then(response=>{
            res.status(200).send(responseHandler(false,'new address added.',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

router.get('/address',query('id').optional(), (req,res)=>{
    const id=Number(req.query.id)
    const userID=req.headers.id
    if(id){
        database('user_address').
        join('provinces','user_address.provinceID','=','provinces.id').
        join('cities','user_address.cityID','=','cities.id').
        select('user_address.*','provinces.title as province','cities.city as city').
        where('user_address.id','=',id).
        where('user_address.userID','=',userID).
        then(response=>{
            res.status(200).send(responseHandler(false,null,response[0]))
        }).catch(err=>{
            console.log(err)
            res.status(200).send(responseHandler(true,'error in db',null))
        })

    }else{
        database('user_address').
        join('provinces','user_address.provinceID','=','provinces.id').
        join('cities','user_address.cityID','=','cities.id').
        select('user_address.*','provinces.title as province','cities.city as city').
        where({userID}).
        then(response=>{
            res.status(200).send(responseHandler(false,null,response))
        }).catch(err=>{
            console.log(err)
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }



})

router.put('/address',body(['title','address','provinceID','cityID','postal_code','phone','addressID']).notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const data = matchedData(req);
        const userID=req.headers.id;
        database('user_address').
        where({id:data.addressID,userID}).
        update({
            title:data.title,
            address:data.address,
            provinceID:data.provinceID,
            cityID:data.cityID,
            postal_code:data.postal_code,
            phone:data.phone
        }).
        then(response=>{
            res.status(200).send(responseHandler(false,'address updated.',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})

router.delete('/address/:addressID',param('addressID').notEmpty(),(req,res)=>{
    const result = validationResult(req);
    if(result.isEmpty()) {
        const param = matchedData(req);
        const userID=req.headers.id;
        database('user_address').
        where({id:param.addressID,userID}).
        del().
        then(response=>{
            res.status(200).send(responseHandler(false,'address deleted.',null))
        }).catch(err=>{
            res.status(200).send(responseHandler(true,'error in db',null))
        })
    }else{
        res.status(200).send(responseHandler(true,result.array(),null))
    }

})


module.exports=router
