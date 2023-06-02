<template>
  <a-comment>
    123123
  </a-comment>
<!-- <a-comment :item="CommentDetail">
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
        <span key="comment-basic-reply-to">回复</span>
        
        <span key="comment-basic-outlined">
     
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

</a-comment> -->
</template>

<script setup>
import {LikeFilled,LikeOutlined,DislikeFilled,DislikeOutlined,MoreOutlined} from '@ant-design/icons-vue'
import {onBeforeMount,defineProps, reactive,defineEmits} from 'vue'
import dayjs from "dayjs";
import axios from 'axios';
import { useUserStore } from '@/store/user';

import 'dayjs/locale/zh-cn'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.locale('zh-cn');
dayjs.extend(relativeTime)

const props = defineProps({item:Object});

console.log('CommentChild:',props.item);

</script>