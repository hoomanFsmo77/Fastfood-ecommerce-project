<script setup lang="ts">
import {useCart} from "~/composables/useCart";

const props=defineProps<{
  type:'custom' | 'ready',
  cartId:number,
  image:string | null,
  title:string | null,
  description:string | null,
  price:number,
  quantity:number,
  subtotal:number,
  link:string|null,
  off:boolean | null
  off_percent:number|null,
  editable:boolean
}>()

const {removeBasketItem,increaseQuantity,decreaseQuantity}=useCart(props)

</script>

<template>
  <tr>
    <td v-if="editable">
      <button @click="removeBasketItem" class="cursor-pointer">
        <Icon size="1.3rem" name="bi:x" class="text-gray-500 font-600 transition-all hover:text-primary-dark-3" />
      </button>
    </td>
    <td v-if="type==='ready'">
      <div class="flex items-center">
        <NuxtLink  class="block" :to="{name:'PRODUCT_DETAIL',params:{link}}">
          <VImage :src="image" width="85" class="!w-[85px]" />
        </NuxtLink>
        <NuxtLink :to="{name:'PRODUCT_DETAIL',params:{link}}" class="ml-1 font-400 text-secondary-light-2 transition-all hover:text-primary-dark-3">{{title}}</NuxtLink>
      </div>
    </td>
    <td v-else>
      <div>
        <NuxtLink :to="{name:'PRODUCT_BUILD'}" class="font-400 block text-secondary-light-2 ml-[6.2rem] mb-0.5 transition-all hover:text-primary-dark-3" >		Build your own Product</NuxtLink>
      </div>
      <div v-html="description"></div>
    </td>
    <td>

      <template v-if="type==='ready'">
        <div class="" v-if="off">
          <p class="font-400 text-secondary-light-2 text-1.1">
            ${{$calculate_off_price(price,off_percent).toFixed(2)}}
          </p>
          <p class="font-400 line-through">
            ${{price.toFixed(2)}}
          </p>
        </div>
        <p class="font-400" v-else>
          ${{price.toFixed(2)}}
        </p>
      </template>
      <template v-else>
        <p  class="font-400">
          ${{price.toFixed(2)}}
        </p>
      </template>


    </td>
    <td v-if="editable">
      <VCounter :disable="true" @increase="increaseQuantity" @decrease="decreaseQuantity" :counter="quantity"/>
    </td>
    <td v-else>
      <p class=" font-400">
        {{quantity}}
      </p>
    </td>
    <td>
      <p class="font-400">
        ${{subtotal.toFixed(2)}}
      </p>
    </td>
  </tr>

</template>

<style >
.order-container{
  display: flex;
  align-items: center;
}
.order-image{
  width: 85px;
}
.order-data{
  margin-left: 1rem;
}
.order-data div{
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
}

.order-data h6 ,.order-data p{
  font-size: 0.8rem !important;
  margin-right: 0.5rem;
  font-weight: 400 !important;
}
.order-data h6{
  font-weight: 600 !important;
}
</style>