<template>
    <a-comment>
      <template #actions>
        <span key="comment-basic-like">
          <a-tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span key="comment-basic-reply-to">Reply to</span>
      </template>
      <template #author><a>Han Solo</a></template>
      <template #avatar>
        <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      </template>
      <template #content>
        <p>
          We supply a series of design principles, practical patterns and high quality design
          resources (Sketch and Axure), to help people create their product prototypes beautifully and
          efficiently.
        </p>
      </template>
      <template #datetime>
        <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs().fromNow() }}</span>
        </a-tooltip>
      </template>

      <a-comment>
        <template #actions>
            <span key="comment-basic-like">
          <a-tooltip title="Like">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <a-tooltip title="Dislike">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </a-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
            <span>Reply to</span>
        </template>
        <template #author>
            <a>Han Solo</a>
        </template>
        <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
            <p>
            We supply a series of design principles, practical patterns and high quality design
            resources (Sketch and Axure).
            </p>
        </template>
        <template #datetime>
            <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
            <span>{{ dayjs().fromNow() }}</span>
            </a-tooltip>
        </template>
        </a-comment>
    </a-comment>
  </template>
<script setup>
import {LikeFilled,LikeOutlined,DislikeFilled,DislikeOutlined} from '@ant-design/icons-vue'
import {onBeforeMount} from 'vue'
import dayjs from "dayjs";

var relativeTime = require('dayjs/plugin/relativeTime')
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn');
dayjs.extend(relativeTime)


</script>