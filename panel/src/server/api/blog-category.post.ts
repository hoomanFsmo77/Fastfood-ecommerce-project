import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";
import {serializeError} from "~/utils/functions";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    if(token && token.jwt){
        if(query.method==='GET' && !query.id){
            try {
                const req=await $fetch<IResponse<any>>('/blog-category',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt}
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='GET' && query.id){
            try {
                const req=await $fetch<IResponse<any>>('/blog-category',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        id:query.id
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    return req.data
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='POST' || query.method==='PUT'){
            const reqQuery=query.method==='POST' ? {category:query.category} : {category:query.category,id:query.id};
            try {
                const req=await $fetch<IResponse<any>>('/blog-category',{
                    method:query.method,
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:reqQuery
                })
                if(req.error){
                    return {
                        code:400,
                        errors:serializeError(req.errors)
                    }
                }else{
                    return  {
                        code:200,
                        errors:null
                    }
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }else if(query.method==='DELETE'){
            try {
                const req=await $fetch<IResponse<any>>('/blog-category',{
                    method:'DELETE',
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        id:query.id
                    }
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    sendNoContent(event,200)
                }
            }catch (err) {
                sendNoContent(event,400)
            }
        }
    }

})