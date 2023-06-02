<template>
    <!-- <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.author"
            :avatar="item.avatar"
            :content="item.content"
            :datetime="item.datetime"
          />
        </a-list-item>
      </template>
    </a-list> -->
    <a-comment>
      <template #avatar>
        <a-avatar src="" alt="Han Solo" />
      </template>
      <template #content>
        <a-form-item>
          <a-textarea v-model:value="value" :rows="4" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
            Add Comment
          </a-button>
        </a-form-item>
      </template>
    </a-comment>
  </template>
<script setup>
  import { useUserStore } from '../../../store/user';
import { ref,defineProps, reactive,defineEmits } from 'vue';
import axios from 'axios';

//   import dayjs from 'dayjs';
//   import relativeTime from 'dayjs/plugin/relativeTime';
//   dayjs.extend(relativeTime);
const props = defineProps({_id:String})
const emit  = defineEmits(['addCommentData'])

const UserStore = useUserStore();

  const submitting = ref(false);
  const value = ref('');
  const CommentForm = reactive({
    issueID:props._id,
    content:'',
    author:UserStore.profile.username,
    UID:UserStore.profile.UID,
    likes:0,
    dislikes:0
  });
  const handleSubmit = () => {
    if (!value.value) {
      return;
    }
    // console.log(value.value);
    CommentForm.content = value.value;
    console.log('CommentForm:',CommentForm);
    axios.post('api/comment/addOneLevelComment',CommentForm)
               .then(res=>{
                console.log('res:',res);
                if(res.data.code==200){
                  console.log('新增评论成功');
                  //将新增加的评论用emit push到comment列表中
                  console.log('新增加的评论:',res.data.data);
                  emit('addCommentData',res.data.data);
                }else{
                  console.log('新增加评论失败:',res.data.body._message);
                }
               })
               .catch(err=>{
                console.log('err:',err);
               })
  };
  </script>