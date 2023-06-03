<template>

<a-comment :reply="replyDetail">
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <like-outlined />
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ reply.likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <dislike-outlined />
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ reply.dislikes }}
          </span>
        </span>
        <div >
          <div>
            <span @click="showModal" style="cursor: pointer ">回复</span>
            <a-modal v-model:open="replyOpen"  title="回复" @ok="addReplyTo(reply)">
              <a-textarea  v-model:value="replyContent"   placeholder="这里不是祖安，请友好交流"  />
            </a-modal>
          </div>
        </div>
        
        <span key="comment-basic-outlined">
     
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                  <more-outlined />
              </a>
              <template #overlay>
                  <a-space>
                    <a-button @click="deleteReply(reply)" type="primary" danger  ghost>删除</a-button>
                  </a-space> 
              </template>
            </a-dropdown>

        </span>
        
      </template>

      <template #author><a>{{ reply.author }}</a></template>
      <template #avatar>
        <a-avatar src="" alt="头像加载失败" />
      </template>
      <template #content>
        <p>
         {{ reply.content }}
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs(dayjs(reply.createTime).format('YYYY-MM-DD HH:mm:ss')).fromNow() }}</span>
        </a-tooltip>
      </template>

</a-comment> 
</template>

<script setup>
import {LikeFilled,LikeOutlined,DislikeFilled,DislikeOutlined,MoreOutlined} from '@ant-design/icons-vue'
import {ref,onBeforeMount,defineProps, reactive,defineEmits} from 'vue'
import dayjs from "dayjs";
import axios from 'axios';
import { useUserStore } from '@/store/user';

import 'dayjs/locale/zh-cn'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.locale('zh-cn');
dayjs.extend(relativeTime)

const props = defineProps(
  { reply:Object,
    index:Number,
    item:Object
  });
const UserStore = useUserStore();

// console.log('CommentChild:',props.reply);
// console.log('index:',props.index);
// console.log('item:',props.item);
const replyDetail = reactive(props.reply);
const replyToIndex = replyDetail.replyToIndex;
console.log('replyToIndex:',replyToIndex);
// const replyToObject = props.item.replies[replyDetail.replyToIndex]



const replyOpen = ref(false);
const replyContent = ref('');
const showModal = () => {
  replyOpen.value = true;
};
// 二级回复
const addReplyTo =async (reply) => {
  const  _id= props.item._id;
  const  index=props.index;
  const twoReplyForm = reactive({
    content:replyContent.value,
    author:UserStore.profile.username,
    UID:UserStore.profile.UID,
    replyTo:reply._id,
    replyToIndex:index
  });
  axios.post('api/comment/addTwoLevelReply',{_id,index,twoReplyForm});
  replyOpen.value = false;
  replyContent.value = ''
  
};




const deleteReply = (reply) => {
  console.log("要删除的reply：",reply);
   axios.post('api/comment/deleteTwoLevelComment',{
      UID:UserStore.profile.UID,
      index:props.index,
      _id:props.item._id
   })
            .then(res=>{
                console.log('res:',res);
            })
}
onBeforeMount(()=>{
  // console.log('replyToObject:', replyToObject );
  if(replyDetail.replyTo){
    console.log('replyDetail:',replyDetail);
    replyDetail.content=`@${props.item.replies[replyToIndex].author}     ${ replyDetail.content}`
  }
})
</script>