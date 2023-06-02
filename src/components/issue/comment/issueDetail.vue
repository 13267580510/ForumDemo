<template>
  <div>
    <h2>标题:{{  IssueData.title}}</h2>
    <div>内容：{{ IssueData.content}} </div>
    <span>时间:{{ IssueData.createTime }}</span><br>
    <span>作者:{{ IssueData.author }}</span>
  </div>
  <addComment :_id="IssueData._id" @addCommentData="addCommentData"></addComment>

  <commentList v-for="item in  commentData" :key=item :item="item" @getComment="getComment"></commentList>
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
                    getComment();
                  })
                  .catch(err=>{
                    console.log('err:',err);
                  })
})

//定义该问题下的评论数据格式
const  commentData = reactive([]);


//获取评论数据
const getComment = async () =>{
  await axios.post('api/comment/getComment',{issueID:IssueData._id})
            .then(res=>{
              console.log('接收到请求所有评论数据的返回:',res);
              for(let i=0;i<res.data.length;i++){
                  commentData[i]=res.data[i];
              }
              console.log('commentData:',commentData);
            })
}

//增加并刷新评论列表
const addCommentData = (item) =>{
  console.log('有新的评论:',item);
  commentData.push(item);
  console.log('commentData:',commentData);
}




</script>

<style>

</style>