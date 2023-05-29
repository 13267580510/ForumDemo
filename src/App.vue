<template>
  <nav>
    <router-link to="/">Home</router-link> 
  </nav>
  <router-view />
</template>

<script setup>
import axios from 'axios';
import {unmounted} from 'vue';
import {useUserStore}  from './store/user'

const UserStore = useUserStore();

unmounted(()=>{
  console.log('开始监听');
  window.addEventListener('beforeunload', sendPostRequest);
})

const sendPostRequest = ()=>{
  axios.post('api/users/UpdateStatus',{
              UID:UserStore.profile.UID,
              status:false
            })
}

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
