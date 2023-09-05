

import {IResponse} from "~/utils/types";

export default defineEventHandler(async ev=>{
    const {api_base,access_key}=useRuntimeConfig();
    const query=await getQuery(ev)
    try {
        const req=await $fetch<IResponse<any>>(`/loc/city/${query.provinceID}`,{
            baseURL:api_base,
            headers:{access_key}
        })
        if(req.error){
            sendNoContent(ev,400)
        }else{
            return req.data
        }
    }catch (err) {
        sendNoContent(ev,400)
    }

})