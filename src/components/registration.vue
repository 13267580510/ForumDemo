<template>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
  
      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item
        label="nickname"
        name="nickname"
        :rules="[{ required: true, message: 'Please input your nickname!' }]"
      >
        <a-input-password v-model:value="formState.nickname" />
      </a-form-item>

      <a-form-item
        label="avatar"
        name="avatar"
        :rules="[{ required: true, message: 'Please input your avatar!' }]"
      >
        <a-input-password v-model:value="formState.avatar" />
      </a-form-item>

  
      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>
  
      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>

      <a-form-item  :wrapper-col="{ offset: 8, span: 16 }">
        <a-button v-if="ResStatus" type="primary" html-type="submit">Submit</a-button>
      </a-form-item>

    </a-form>
  </template>

<script lang="ts">
const axios = require('axios');
import { defineComponent, onMounted, reactive, ref } from 'vue';
  
  interface FormState {
    username: string;
    password: string;
    nickname:string;
    avatar:string;
    remember: boolean;
  }
  export default defineComponent({
    setup() {
      const formState = reactive<FormState>({
        username: '',
        password: '',
        nickname:'',
        avatar:'',
        remember: true,
      });

      const ResStatus =   ref(false);

      const BaseUrl = 'api/users/register'
      const onFinish = (values: any) => {
        
        axios.post(BaseUrl, {
          username: formState.username,
          password: formState.password,
          nickname: formState.nickname,
          avatar: formState.avatar
        })
        .then(function (response:any) {
          console.log(response);
    
        })
        .catch(function (error:any) {
          onFinishFailed(error);        
        });
      };
  
      const onFinishFailed = (errorInfo: any) => {
        ResStatus.value = ! ResStatus.value
        console.log("ResStatus:",ResStatus.value);  
        console.log('Failed:', errorInfo);
      };
      
      onMounted(()=>{
        console.log("ResStatus:",ResStatus.value);
      })

      return {
        formState,
        ResStatus:ResStatus.value,
        onFinish,
        onFinishFailed,
      };
    },
  });
  </script>
  
  