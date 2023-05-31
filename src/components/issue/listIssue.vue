<template>
    <div>
      <br />
      <br />
      <a-input-search
        v-model:value="keyword"
        placeholder="input search loading with enterButton"
        enter-button
        @search="search"
      />
    </div>
    <div>

    </div>
</template>

<script setup>
import {useIssueStore} from '../../store/issue';
import { useUserStore } from '@/store/user';
import axios from 'axios';
import { ref } from 'vue';

const IssueStore =  useIssueStore();
const UserStore =  useUserStore();

const keyword = ref('');
const baseURL='api/issue/getIssue'

const search = ()=>{
    console.log("关键字：",keyword.value," ","开始查询：");
    axios.post(baseURL,{
        keyword:keyword.value
        })
        .then(res=>{
            console.log("res:",res);
            IssueStore.IssueListCopy=res.data
        })
        .catch(err=>{
            console.log('err:',err);
        })
}
</script>