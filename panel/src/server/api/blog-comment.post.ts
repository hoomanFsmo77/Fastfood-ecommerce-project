import { getServerSession,getToken } from '#auth'
import {IResponse} from "~/utils/types";

export default defineEventHandler(async event=>{
    const {api_base,access}=useRuntimeConfig();
    const query=await getQuery(event);
    const token=await getToken({event});
    if(token && token.jwt){
        if(query.method==='GET'){
            try {
                const req=await $fetch<IResponse<any>>('/blog-comments',{
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                    query:{
                        page:query.page || 1,
                        per:query.per || 6
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
        }else if(query.method==='PUT'){
            try {
                const req=await $fetch<IResponse<any>>(`/blog-comments/change-status/${query.commentID}`,{
                    method:'PUT',
                    baseURL:api_base,
                    headers:{access,token:token.jwt},
                })
                if(req.error){
                    sendNoContent(event,400)
                }else{
                    sendNoContent(event,200)
                }
            }catch (err) {
                sendNoContent(event,400)
            }

        }else if(query.method==='DELETE'){
            try {
                const req=await $fetch<IResponse<any>>(`/blog-comments`,{
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