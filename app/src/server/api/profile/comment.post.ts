import {readBody,getCookie} from "h3";
import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const body=await readBody(ev);
    const query=await getQuery(ev);
    const {api_base,access}=useRuntimeConfig();
    const token=getCookie(ev,'x_wengdo_x');
    if(query.type==='product' && query.method==='POST'){
        try {
            const req=await $fetch<IResponse<any>>('/product-comments',{
                baseURL:api_base,
                method:'POST',
                body,
                headers:{
                    access,
                    token,
                    'Content-Type':'application/json'
                }
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req
            }

        }catch (err) {
            return err
        }

    }else if(query.type==='blog' && query.method==='POST'){
        try {
            const req=await $fetch<IResponse<any>>('/blog-comments',{
                baseURL:api_base,
                method:'POST',
                body,
                headers:{
                    access,
                    token,
                    'Content-Type':'application/json'
                }
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req
            }

        }catch (err) {
            return err
        }
    }else if(query.type==='product' && query.method==='GET'){
        try {
            const req=await $fetch<IResponse<any>>('/product-comments/user',{
                baseURL:api_base,
                query:{
                    per:query.per,
                    page:query.page,
                },
                headers:{
                    access,
                    token,
                }
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req.data
            }

        }catch (err) {
            return err
        }


    }else if(query.type==='blog' && query.method==='GET'){
        try {
            const req=await $fetch<IResponse<any>>('/blog-comments/user',{
                baseURL:api_base,
                query:{
                    per:query.per,
                    page:query.page,
                },
                headers:{
                    access,
                    token,
                }
            })
            if(req.error){
                sendNoContent(ev,400)
            }else{
                return req.data
            }

        }catch (err) {
            return err
        }
    }


})