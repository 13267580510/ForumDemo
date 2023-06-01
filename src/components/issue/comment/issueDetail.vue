<template>
  <div>
    <h2>标题:{{  IssueData.title}}</h2>
    <div>内容：{{ IssueData.content}} </div>
    <span>时间:{{ IssueData.createTime }}</span><br>
    <span>作者:{{ IssueData.author }}</span>
  </div>
  <addComment :_id="IssueData._id"></addComment>
  <commentList></commentList>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue';
import {useRoute} from 'vue-router'
import axios from 'axios'
//引入组件
import commentList from './commentList.vue'
import addComment from './addComment.vue'


const route = useRoute();
const IssueID =route.params.IssueID;
console.log('IssueID:',IssueID);

const IssueData = reactive({
  _id:IssueID,
  title:'',
  content:'',
  author:'',
  createTime:''
});

onBeforeMount(async ()=>{
  //获取问题的具体信息
  console.log('开始根据问题_id查找');
  const BaseURL = 'api/issue'
  await axios.post(`${BaseURL}/getIssue`,{_id:IssueID})
                  .then(res=>{
                    console.log('IssueData Res:',res.data);
                    IssueData.title = res.data.title;
                    IssueData.content = res.data.content;
                    IssueData.author = res.data.author;
                    //格式化时间
                    const dateString  = res.data.createTime;
                    const date = new Date(dateString);
                    const formattedDate = date.toLocaleString('zh-CN', {
                                          year: 'numeric',
                                          month: '2-digit',
                                          day: '2-digit',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit'
                                        });

                    IssueData.createTime = formattedDate
                    console.log('IssueData:',IssueData);
                  })
})






</script>

<style>

</style>