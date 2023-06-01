<template>
    <a-button type="primary" @click="showDrawer">
      New account
    </a-button>
    <a-drawer
      title="修改问题"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="标题" name="title">
                <a-input v-model:value="form.title" placeholder="请输入新标题" />

            </a-form-item>
          </a-col>
        
        </a-row>

        

        

        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="内容" name="content">
              <a-textarea
                v-model:value="form.content"
                :rows="4"
                placeholder="请输入新的问题描述"
              />
            </a-form-item>
          </a-col>
        </a-row>


        <a-row :gutter="16">
            
            <a-col :span="12">
              <a-form-item label="问题分类" name="category">
                  <a-radio-group v-model:value="form.category">
                      <a-radio :value="'software'">硬件</a-radio>
                      <a-radio :value="'hardware'">软件</a-radio>
                  </a-radio-group>
              </a-form-item>
            </a-col>
            
          </a-row>
      </a-form>

      <template #extra>
        <a-space>
          <a-button @click="onClose">Cancel</a-button>
          <a-button type="primary" @click="onClose">Submit</a-button>
        </a-space>
      </template>
    </a-drawer>
  </template>
  <script setup>
  import { reactive, ref,defineEmits,toRefs, defineProps,onBeforeMount,onMounted} from 'vue';

  const emit = defineEmits(['commitForm'])

  const props = defineProps({info:Object})

  let form = reactive({
    title: '',
    category: '',
    content: '',
    _id:'',
    UID:'',
    author:''

  });
  const rules = {
    title: [{
      required: true,
      message: '此为必填项',
    }],
    category: [{
      required: true,
      message: '此为必填项',
    }],
    content: [{
      required: true,
      message: '此为必填项',
    }],
  };
  const open = ref(false);
  const showDrawer = () => {
    open.value = true;
  };
  const onClose = () => {
    open.value = false;
    commitForm();
  };

  const commitForm = ()=>{
    emit('commitForm',form);
  }

  onMounted(()=>{
    form = {...props.info}
  })
  </script>