<script setup lang="ts">
const {data,pending}=await useFetch('/api/home/offer')

</script>

<template>
  <section class="md:static relative" v-if="!pending" :style="data.image && {background:`url(${data.image})`}" id="offer">
    <v-row>
      <v-column lg="5" col="0"></v-column>
      <v-column lg="7"  col="12">
        <div class="md:static relative md:z-auto z-10">
          <div class="w-full items-end  flex">
            <h4 class="capitalize  md:!h4 !h6 font-playFair text-primary-light-1 italic">
              exclusive offer
            </h4>
            <span class="inline-block ml-1 w-8 h-[1px] bg-primary-light-1"></span>
          </div>
          <p class="text-primary-light-1 md:text-5 text-2 mt-1 font-700 ">{{data.title}}</p>
          <div class="flex items-center">
              <div>
                <p class="md:text-6 text-4 leading-1 text-primary-light-1 font-600"> <sup class="text-2 text-primary-light-1">$</sup>{{data.price}}</p>
                <p class="text-primary-light-1 text-1.5 uppercase text-center font-300">Each</p>
              </div>
            <ul class="ml-5">
              <li class="text-secondary-light-4 text-0.9 md:text-1.2 font-600">- {{data.specification_1}}</li>
              <li class="text-secondary-light-4 text-0.9 md:text-1.2 font-600 my-0.5">- {{data.specification_2}}</li>
              <li class="text-secondary-light-4 text-0.9 md:text-1.2 font-600">- {{data.specification_3}}</li>
            </ul>
          </div>
          <NuxtLink class="btn btn-primary mt-2 " :to="{name:'PRODUCT_DETAIL',params:{link:data.link}}">
            order now
          </NuxtLink>

        </div>
      </v-column>
    </v-row>
    <div class="md:hidden block absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.3)]"></div>
  </section>
</template>

<style scoped>

</style>