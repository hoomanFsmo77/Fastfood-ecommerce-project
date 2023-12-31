<script setup lang="ts">
import {useProduct} from "~/composables/useProduct";
import {getDateDetail, submitForm} from "~/utils/functions";
const date=new Date();
definePageMeta({
  name:'PRODUCTS_DETAIL',
  page_title:'Product detail',
  validate(route){
    return /\d+/.test(route.params.id as string)
  }
});
const route=useRoute()
const {data,pending}=await useFetch('/api/products',{
  method:'POST',
  query:{
    method:'GET',
    productID:route.params.id
  }
})
const {data:product_category,pending:product_category_pending}=await useFetch('/api/product-category',{
  method:'POST',
  query:{
    method:'GET',
  },
  transform(data){
    return data.map(item=>{
      return{
        id:item.id,
        title:item.name
      }
    })
  }
})
const {removeProduct,editProduct,productData,editProductFlag,selectData,offHandler,statusHandler,categoryHandler,extraImageData,extraImageHandler}=useProduct(data)
const form=ref<HTMLElement|null>(null)
const editProductForm = () => submitForm(form)


</script>

<template>

  <v-row v-if="productData.errors" class="mb-1 justify-center">
    <v-column class="justify-center" col="7">
      <ul class="bg-primary-dark-5 p-1 rounded-4" >
        <li class="text-red-400 capitalize" v-for="(item,index) in productData.errors">{{index+1}}) {{item}}</li>
      </ul>
    </v-column>
  </v-row>
  <v-row class="mb-1" v-if="!pending">
    <FormKit   id="form" type="form" ref="form"  @submit="editProduct"  :actions="false" >
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="title"
              :value="data.title"
              :disabled="!editProductFlag"
              id="title"
              name="title"
              validation="required"
              validation-label="title"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_text"
              label="link"
              :disabled="!editProductFlag"
              :value="data.link"
              id="link"
              name="link"
              validation="required"
              validation-label="link"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_number"
              label="price"
              id="price"
              :disabled="!editProductFlag"
              :value="data.price"
              name="price"
              validation="required"
              validation-label="price"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VSelect @fire="statusHandler" :disabled="!editProductFlag" label="Status"  :select-id="data.status ? 1 : 2" :data="[{id:1,title:'Available'},{id:2,title:'Unavailable'}]" />

        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <VSelect @fire="categoryHandler" :disabled="!editProductFlag" label="Category" :select-id="data.categoryID" v-if="!product_category_pending"  :data="product_category" />

        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_number"
              label="quantity"
              id="quantity"
              :disabled="!editProductFlag"
              :value="data.quantity"
              name="quantity"
              validation="required"
              validation-label="quantity"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VSelect @fire="offHandler" :disabled="!editProductFlag" label="Off"  :select-id="data.off ? 1 : 2" :data="[{id:1,title:'Enable'},{id:2,title:'Disable'}]" />

        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              v-if="selectData.off===1"
              type="custom_number"
              label="off percent"
              id="off_percent"
              min="1"
              value="1"
              max="99"
              :disabled="!editProductFlag"
              :value="data.off_percent"
              name="off_percent"
              validation="required"
              validation-label="off percent"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              v-if="selectData.off===1"
              type="custom_date"
              label="sale from"
              id="date_on_sale_from"
              :disabled="!editProductFlag"
              :value="data.date_on_sale_from ?  getDateDetail(data.date_on_sale_from) : getDateDetail(date.toISOString())"
              name="date_on_sale_from"
              validation="required"
              validation-label="sale from"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              v-if="selectData.off===1"
              type="custom_date"
              label="sale to"
              id="date_on_sale_to"
              :disabled="!editProductFlag"
              :value="data.date_on_sale_to ? getDateDetail(data.date_on_sale_to):`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`"
              name="date_on_sale_to"
              validation="required"
              validation-label="sale to"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="caption"
              :value="data.caption"
              :disabled="!editProductFlag"
              id="caption"
              name="caption"
              validation="required"
              validation-label="caption"
          />
        </v-column>
        <v-column md="4" col="12" class="md:px-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="brief"
              :disabled="!editProductFlag"
              :value="data.brief"
              id="brief"
              name="brief"
              validation="required"
              validation-label="brief"
          />
        </v-column>
        <v-column  md="4" col="12" class="md:pl-0.5 md:mb-0 mb-1">
          <FormKit
              type="custom_area"
              label="description"
              id="description"
              :disabled="!editProductFlag"
              :value="data.description"
              name="description"
              validation="required"
              validation-label="description"
          />
        </v-column>
      </v-row>
      <v-row class="mb-1.5">
        <v-column  md="4" col="12" class="md:pr-0.5  mb-1">
          <VImage :width="150" :show_image="true" :profile_image="data.primary_image" :editFlag="editProductFlag" :multiple="false" id="primary_image" label="Primary Image"/>
        </v-column>
        <v-column v-for="(item,index) in data.product_images" md="4" col="12" class="md:px-0.5  mb-1">
          <VImage @fire="extraImageHandler" :multiple="false" :image-id="item.id" :width="150" :show_image="true" :profile_image="item.image" :editFlag="editProductFlag" :id="`image_${index+1}`" :label="`Image `+(index+1)"/>
        </v-column>
      </v-row>
      <v-row class="mb-1.5" >
        <v-column  md="12" class="md:pr-0.5 md:mb-0 mb-1">
          <VImage  @fire="extraImageHandler"  :width="150" :show_image="false"  :editFlag="editProductFlag" :multiple="true" id="new_images" label="Add New Image"/>
        </v-column>
      </v-row>
    </FormKit>

  </v-row>


  <v-row>
    <v-column col="12" class="flex">
      <button @click="removeProduct" class="btn btn-primary btn-sm mr-1">
        remove
      </button>
      <VBtnLoader v-if="editProductFlag" :flag="productData.flag"    @click="editProductForm" class="btn btn-primary btn-sm ">
        confirm
      </VBtnLoader>
      <button v-else @click="editProductFlag=true" class="btn btn-primary btn-sm ">
        edit
      </button>
    </v-column>
  </v-row>

</template>

<style scoped>

</style>