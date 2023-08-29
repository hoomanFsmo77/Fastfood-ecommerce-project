import {Ref} from "vue";
import {IProduct} from "~/utils/types";


export const useProduct=(product_data:Ref<IProduct|null>)=>{
    const productPageData=shallowReactive({
        quantity:1 as number,
        tabIndex:0 as number,
        replyMessage:null as string|null,
        btnLoaderFlag:false as boolean,
        reset(){
            this.btnLoaderFlag=false
            this.quantity=1
        }
    })
    const {$toast}=useNuxtApp()
    const {isLogin}=useStates();


    ///////////////////////////////////////////////
    const replySubmit = (msg:string) => {
        productPageData.replyMessage=msg
    }

    const plusQuantity = () => {
        if(product_data.value && productPageData.quantity!==product_data.value.quantity && product_data.value.status){
            productPageData.quantity++
        }
    }
    const minusQuantity = () => {
        if(productPageData.quantity>1 && product_data.value && product_data.value.status){
            productPageData.quantity--
        }
    }

    const changeQuantity = (ev:Event) => {
        const el=ev.target as HTMLInputElement;
        const value=Number(el.value)
        if(product_data.value && value>product_data.value.quantity && product_data.value.status){
            productPageData.quantity=product_data.value.quantity
        }
    }



    const addToCart =async () => {

        if(isLogin.value){
           productPageData.btnLoaderFlag=true
            try {
               const req=await $fetch('/api/profile/basket/add',{
                   query:{
                       productID:product_data.value?.id,
                       quantity:productPageData.quantity
                   }
               })
                $toast('success').fire({
                    text: 'product added to you basket!',
                    icon: 'success',
                })
                return navigateTo({name:'SHOPPING_CART'})
            }catch (e) {
                $toast('error').fire({
                    text: 'error in connecting to server!',
                    icon: 'error',
                })
            }finally {
                productPageData.reset()
            }

        }else{
            $toast('error').fire({
                text: 'you are not logged in yet!',
                icon: 'error',
            })
        }
    }

    return{
        addToCart,changeQuantity,minusQuantity,plusQuantity,replySubmit,productPageData
    }
}