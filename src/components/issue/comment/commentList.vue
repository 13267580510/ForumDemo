<template>
    <a-comment :item="CommentDetail">
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <like-outlined />
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ item.likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <dislike-outlined />
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ item.dislikes }}
          </span>
        </span>
        
        <div >
          <div>
            <span @click="showModal" style="cursor: pointer ">回复</span>
            <a-modal v-model:open="open"  title="回复" @ok="addReplyTo">
              <a-textarea  v-model:value="replyContent"   placeholder="这里不是祖安，请友好交流"  />
            </a-modal>
          </div>
        </div>

     
        

        <!-- 删除按钮 -->
        <span key="comment-basic-outlined">
          <!-- <more-outlined /> -->
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                  <more-outlined />
              </a>
              <template #overlay>
                  <a-space>
                    <a-button @click="deleteComment(item)" type="primary" danger  ghost>删除</a-button>
                  </a-space> 
              </template>
            </a-dropdown>

        </span>
        
        
      </template>

      <template #author><a>{{ item.author }}</a></template>
      <template #avatar>
        <a-avatar src="" alt="头像加载失败" />
      </template>
      <template #content>
        <p>
         {{ item.content }}
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs(dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss')).fromNow() }}</span>
        </a-tooltip>
      </template>

      <!-- 二级评论组件 -->
      <commentChild v-for="(reply,index) in item.replies" :key=reply._id :reply="reply" :index="index" :item="item"></commentChild>

    </a-comment>
  </template>
<script setup>
import {LikeFilled,LikeOutlined,DislikeFilled,DislikeOutlined,MoreOutlined} from '@ant-design/icons-vue'
import {onBeforeMount,defineProps, reactive,defineEmits,ref} from 'vue'
import dayjs from "dayjs";
import axios from 'axios';
import { useUserStore } from '@/store/user';
import commentChild from './commentChild/commentChild.vue'
import 'dayjs/locale/zh-cn'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.locale('zh-cn');
dayjs.extend(relativeTime)

const props = defineProps({item:Object});
const CommentDetail = reactive(props.item)
const UserStore = useUserStore();
const emit = defineEmits(['getComment']);

onBeforeMount(()=>{
  console.log('接收到评论列表数据：',CommentDetail);
  })

const replyContent = ref('');
//一级回复
const addReplyTo = () => {
  console.log('replyContent:',replyContent.value);
  const replyForm = reactive({
    content:replyContent.value,
    author:UserStore.profile.username,
    UID:UserStore.profile.UID,
    replyTo:null,
  });
  open.value = false;
  console.log('新增加二级评论表单：',replyForm);
  axios.post('api/comment/addTw0LevelComment',{CommentDetail,replyForm})
        
  replyContent.value = ''
};

const open = ref(false);

const showModal = () => {
  open.value = true;
};


//删除该评论
const deleteComment = async (item)=>{
  await console.log('要删除的评论ID：',item);
  axios.post('api/comment/deleteComment',{item,UID:UserStore.profile.UID})
            .then(res=>{
              console.log('删除评论res:',res);
              emit('getComment');
            })
            .catch(err=>{
              console.log('err:',err);
            })
}



//添加二级评论
const addCommentChild = async (item)=>{
  console.log('收到创建二级评论请求：',item);
}
</script>