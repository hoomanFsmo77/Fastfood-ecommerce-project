import {IResponse} from "~/utils/types";
import Form from "form-data";
import {Ref} from "vue";


export const urlEncodeBody=(obj:object)=>{
    const changeToArray=Object.entries(obj)
    const urlEncode=new URLSearchParams()
    changeToArray.forEach(item=>{
        urlEncode.append(item[0],item[1])
    })
    return urlEncode
}

export const formDataBody=(obj:object)=>{
    const changeToArray=Object.entries(obj)
    const form=new FormData()
    changeToArray.forEach(item=>{
        form.append(item[0],item[1])
    })
    return form
}
export const nodeFormDataBody=(obj:object)=>{
    const changeToArray=Object.entries(obj)
    const form=new Form()
    changeToArray.forEach(item=>{
        form.append(item[0],item[1])
    })
    return form
}
export const handleIconClick = (node:any) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

export const serializeError=(errors:IResponse<any>['errors'])=>{
    if(errors){
        return typeof errors==='string' ? [errors] :errors.map(error=>{
            return `${error.type} ${error.path}: ${error.msg}`
        })
    }

}
export const calculate_off_price=(price:number,off_percent:number)=>{
    const off=Number(((price*off_percent)/100).toFixed(0))
    return price-off
}

export const querySerialize = (obj:any) => {
    return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&');
}

export const submitForm = (form:Ref<null|HTMLElement>) => {
    if(form.value){
        const node = (form.value as any).node
        node.submit()
    }
};

export const filterCustomProduct = (src:{id:number}[],id:number) => {
  return src.filter(i=>i.id===id)[0]
}

export const getDateDetail=(date:Date)=>{
    const d=new Date(date)
    const year=d.getFullYear()
    const month=d.getMonth()+1
    const day=d.getDate()
    /// 10  2
    if(month>9 && day<10){
        return `${year}-${month}-0${day}`
    }

    // 9 13
    if(month<10 && day>10){
        return `${year}-0${month}-${day}`
    }

    // 3 9
    if(month<10 && day<10){
        return `${year}-0${month}-0${day}`

    }
}