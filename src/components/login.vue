<template>
  <div>
    <div>
        <div>
            <span>账号</span>
            <a-input v-model:value="UserInfo.Account" placeholder="Basic usage" />
        </div>
        <div>
            <span>密码</span>
            <a-input-password v-model:value="UserInfo.Password" placeholder="input password" />
        </div>
        <a-button type="primary" ghost @click="commit">Primary</a-button>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup>
import { defineComponent, reactive, ref } from 'vue';
const UserInfo = reactive({
    //账号
    Account:null,
    Password:null
});

const axios = require('axios');

const commit=()=>{
    console.log("账号"+UserInfo.Account);
    console.log("密码"+UserInfo.Password);
    const BaseUrl = 'api/users/login';
    axios.post(BaseUrl,UserInfo)
        .then((response)=>{
          console.log(response);
    
        })
        .catch((error)=>{
          console.log(error);        
        });
    
}

</script>

<style>

</style>