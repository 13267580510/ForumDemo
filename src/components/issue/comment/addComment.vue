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
import { ref,defineProps, reactive } from 'vue';
import axios from 'axios';

//   import dayjs from 'dayjs';
//   import relativeTime from 'dayjs/plugin/relativeTime';
//   dayjs.extend(relativeTime);
const props = defineProps({_id:String})
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
               })
               .catch(err=>{
                console.log('err:',err);
               })
  };
  </script>