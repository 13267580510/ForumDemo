<template>
  <div>
    <div>
        <div>
            <span>账号</span>
            <a-input v-model:value="UserInfo.UserName" placeholder="Basic usage" />
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
import {useUserStore}  from '../store/user'
const UserInfo = reactive({
    //账号
    UserName:null,
    Password:null
});

const axios = require('axios');

const UserStore= useUserStore();

const commit=()=>{
    const BaseUrl = 'api/users/login';
    axios.post(BaseUrl,UserInfo)
        .then(res=>{
          if(res.data.code==200){
            console.log("个人信息:",res.data.data);
            const data = res.data.data;
            //更新用户仓库
            UserStore.setToken(data.satoken);
            UserStore.status = data.status;
            UserStore.profile = {...data.profile}

            console.log('用户仓库已更改：',UserStore.profile);
            axios.post('api/users/UpdateStatus',{
              UID:UserStore.profile.UID,
              status:true
            })
          }else{
            console.log("登录失败：",res.data.data);
          }
        })
        .catch(error=>{
          console.log(error);        
        });
    
}

</script>

<style>

</style>