import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state() {
        return {
            satoken: '',//权限
            status: '',//登录状态
            profile: {
                UID:"",
                username: '',
                nickname: '',
                avatar: '',
                description: ''
            }
        }
    },
    actions: {
        setToken(value) {
            this.satoken = value
        },
        setLoginId(value){
            this.loginId = value
        },
        loadProfile(){
            userService.findOne(this.loginId).then(({data})=>{
                console.log('个人信息: ', data)
                this.profile = {...data.data}
            })
        }
    },
    persist: {
        enabled: true
    }
})