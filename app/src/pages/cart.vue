<template>

  <client-only>
    <section id="cart-section" v-if="isLogin">
        <v-container v-if="cartListData.items && cartListData.items.length>0">
          <v-row>
            <v-column col="12" class="!block">
              <h1 class="font-600 text-primary-dark-3 mb-1.5">Cart</h1>

              <VTable :flag="!cartListFetchFlag" :head="['','product','price','quantity','subtotal']">
                <CartRow
                  v-for="row in cartListData.items"
                  :image="row?.primary_image || null"
                  :type="row.type"
                  :cart-id="row.id"
                  :description="row?.description || null"
                  :price="row.price"
                  :quantity="row.quantity"
                  :subtotal="row.subtotal"
                  :title="row.title"
                  :link="row?.link || null"
                  :off="row?.off || null"
                  :off_percent="row?.off_percent || null"
                  :editable="true"
                />
              </VTable>


            </v-column>
          </v-row>
          <v-row class="mt-1">
            <v-column col="12" class="!block">
              <v-row>
                <v-column md="3" col="6" class="!block">
                  <VInput v-model="couponData.code" input-class="input-sm placeholder:!text-[#333] !text-[#333]" id="coupon-code" type="text" placeholder="Coupon Code"/>

                </v-column>
                <v-column md="4" col="6" class="!block">
                  <VBtnLoader :flag="couponData.btnFlag" @click="submitCoupon" class="btn btn-secondary btn-sm  ml-1">
                    apply coupon
                  </VBtnLoader>
                </v-column>
                <v-column md="4" col="12" class="md:justify-end  ml-auto">
                  <VBtnLoader :flag="clearCartBtnFlag" @click="clearCart" class="btn btn-secondary btn-sm md:ml-1 mt-1 md:mt-0">
                    clear cart
                  </VBtnLoader>
                </v-column>
              </v-row>
              <v-row>
                <v-column col="12">
                  <p v-if="couponData.message" class="mt-0.5 font-400" :class="{'text-red-600':couponData.errorFlag,'text-green-600':!couponData.errorFlag}">
                    {{couponData.message}}
                  </p>
                </v-column>
              </v-row>
            </v-column>
          </v-row>
          <v-row class="my-2">
            <v-column col="12" class="!block">
              <h2 class="font-600 text-primary-dark-3 mb-2">Cart totals</h2>
              <div class="py-1 flex justify-between border-y-2 border-[rgba(0,0,0,0.1)]">
                <p class="font-600 text-1">Subtotal</p>
                <p class="font-400 text-1">
                  ${{Number(cartListData.order.total_amount).toFixed(2)}}
                </p>
              </div>
              <div v-if="cartListData.order.coupons_code" class="py-1 flex justify-between border-b-2 border-[rgba(0,0,0,0.1)]">
                <p class="font-600 text-1">Coupon</p>
                <p class="font-400 text-1">
                  -{{cartListData.order.coupons_percent}}%
                </p>
              </div>
              <div class="py-1 flex justify-between border-b-2 border-[rgba(0,0,0,0.1)]">
                <p class="font-600 text-1">Total</p>
                <p class="font-400 text-1">
                  ${{Number(cartListData.order.payment_amount).toFixed(2)}}
                </p>
              </div>


            </v-column>
          </v-row>
          <v-row class="pb-2 border-b-[1px] border-[rgba(0,0,0,0.1)]">
            <v-column col="12" class="justify-end">
              <NuxtLink :to="{name:'CHECKOUT'}" class="btn btn-primary btn-light before:!rounded-[0px] !rounded-[0px]  btn-sm">
                Proceed to Checkout
              </NuxtLink>
            </v-column>
          </v-row>

        </v-container>
      <v-container v-else>
        <v-row>
          <v-column col="12" class="!block">
            <h3 class="text-center font-600">Cart is empty.</h3>
          </v-column>
        </v-row>
      </v-container>
    </section>
  <section v-else id="not-login">
    <h5>You are not authenticated yet. <NuxtLink class="text-blue-600 h5" :to="{name:'AUTH'}">login</NuxtLink> or <NuxtLink class="text-blue-600 h5" :to="{name:'AUTH'}">sign in</NuxtLink></h5>
  </section>
  </client-only>


</template>

<script lang="ts" setup>


definePageMeta({
  name:'SHOPPING_CART',
  path:'/shopping-cart',
  layout:'pages',
  page_title:'Shopping Card',
  breadcrumb:[
    {
      name:'Home',
      link:{name:'HOME'},
      on:false
    },{
      name:'Shopping Card',
      link:{name:'SHOPPING_CART'},
      on:true
    }
  ]
});
const {isLogin}=useStates();
const {cartListFetchFlag,cartListData,cartStore}=useCartStore();
const {submitCoupon,couponData,clearCart,clearCartBtnFlag}=useCart(undefined);
onMounted(async ()=>{
  await cartStore.fetchUserCartData()
})
</script>

<style scoped>

</style>