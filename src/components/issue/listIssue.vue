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
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">

          <a-list-item>
            <a-list-item-meta
              :description="item.context"
              @click="IssueDetail(item)"
            >
              <template #title>
                <a >{{ item.title }}</a>
              </template>

              <template #avatar>
                <a-button type="primary" @click="deleteIssue(item)" danger>删除</a-button>
                <EditButton :info="item" @commitForm="EditIssue"></EditButton>
            </template>
            </a-list-item-meta>
            
          </a-list-item>

        </template>
      </a-list>
    </div>
</template>






<script setup>
import {useIssueStore} from '../../store/issue';
import { useUserStore } from '@/store/user';
import axios from 'axios';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


import EditButton from './editButton.vue'

const IssueStore =  useIssueStore();
const UserStore =  useUserStore();

const router = useRouter();

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

onBeforeMount(async()=>{
  await axios.get('api/issue/getIssueInfo')
                  .then(res=>{
                    console.log('res:',res);
                    IssueStore.IssueList=res.data;
                    console.log("IssueStore.IssueList:",IssueStore.IssueList);
                  })
                  .catch(err=>{
                    console.log('err:',err);
                  })
})


const deleteIssue= async (item)=>{
   console.log('item._id:',item._id);
   await axios.post('api/issue/deleteIssue',{
    _id:item._id
   }).then(res=>{
    console.log(res);
   }).catch(err=>{
    console.log(err);
   })
}

const data = IssueStore.IssueList;


const EditIssue = async (form)=>{
  console.log('form',form);
  await axios.post('api/issue/updateIssue',form)
                  .then(res=>{
                    console.log('Update RES:',res);
                  })
                  .catch(err=>{
                    console.log('err:',err);
                  })
}


const IssueDetail = (item)=>{
  console.log('路由跳转开始：',item._id);
  router.push({ name: 'IssueDetail',params:{IssueID:item._id} });
}
</script>