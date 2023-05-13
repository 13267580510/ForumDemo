<template>
    <div>
      <a-input-search
        v-model:value="value"
        placeholder="input search loading with enterButton"
        v-model:loading=loading
        enter-button
        @search="find"
      />
    </div>
    <div>
        <span>username:{{ userinfo.username }}</span>
    </div>
  </template>
  <script>
  import { defineComponent, ref } from 'vue';
  const axios = require('axios');

  export default defineComponent({
    setup() {
      const value = ref('');
      const loading = false;
      const userinfo = ref('');
      const find=  ()=>{
        console.log(value.value);
         axios.get(`/api/users/info?username=${value.value}`)
        .then((res)=>{
            console.log(res)
            userinfo.value=res.data.data
            console.log('userinfo.value:',userinfo.value);
        }).catch((err)=>{
            console.log("错误：",err)
        })
        value.value='';
      }
      return {
        loading,
        value,
        find,
        userinfo
      };
    },
  });
  </script>