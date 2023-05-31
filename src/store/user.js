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
    },
    persist: {
        enabled: true
    }
})