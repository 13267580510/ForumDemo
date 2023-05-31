<template>
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
     
    <a-form-item label="问题">
        <a-input v-model:value="formState.title" show-count :maxlength="20" />
    </a-form-item>
   
    <a-form-item label="详情">
        <a-textarea v-model:value="formState.content" show-count :maxlength="100" />
    </a-form-item>

    <a-form-item label="分类">
      <!-- <a-checkbox-group v-model:value="formState.category"> -->
       <a-radio-group v-model:value="formState.category">
        <a-radio value="software" name="type">软件</a-radio>
        <a-radio value="hardware" name="type">硬件</a-radio>
      </a-radio-group>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
    </a-form>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import {useIssueStore} from '../../store/issue'
import { reactive, toRaw } from 'vue';
import axios from 'axios';


  const UserStore = useUserStore();
  const IssueStore = useIssueStore();
  const formState = reactive({
    title: '',
    content: '',
    category: '',
    author: UserStore.profile.UID,
  });
  
  const onSubmit = async () => {
  const baseURL='api/issue/addIssue'
    axios.post(baseURL,formState)
     .then(res=>{
      console.log('res:',success);
      IssueStore.IssueList.push(res.data);
      console.log(res.data);
      console.log('IssueStore.IssueList:',IssueStore.IssueList);
     })
     .catch(err=>{
        console.log(err);
     })
  };
  const labelCol = {
    style: {
      width: '150px',
    },
  };
  const wrapperCol = {
    span: 14,
  };
  </script>