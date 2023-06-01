<template>
  <nav>
    <router-link to="/">Home</router-link> 
  </nav>
  <router-view />
</template>

<script setup>
import axios from 'axios';
import {onMounted} from 'vue';
import {useUserStore}  from './store/user'

const UserStore = useUserStore();

onMounted(()=>{
  window.addEventListener("beforeunload", async (event) => {
  event.preventDefault(); // 阻止默认的页面关闭行为

  // 创建要发送的数据对象
  const data = {
      UID:UserStore.profile.UID,
      status:false
    };

  try {
    // 使用 Axios 发送 POST 请求
    await axios.post("api/users/UpdateStatus", data);

    // 页面关闭时，后端成功接收到请求并处理
  } catch (error) {
    // 发生错误，请求发送失败
    console.error("请求发送失败:", error);
  }
});


  //   window.addEventListener("beforeunload", (e) => {
//     const formData = new FormData();
//     const data = {
//       UID:UserStore.profile.UID,
//       status:false};
//       formData.append('data',JSON.stringify(data));
//     window.navigator.sendBeacon("api/users/UpdateStatus", formData);
// });
})

</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
