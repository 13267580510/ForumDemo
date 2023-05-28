import {defineStore} from "pinia";
import {userService} from "../http/UserService";

export const useUserStore = defineStore('user', {
    state() {
        return {
            satoken: '',
            loginId: '',
            profile: {
                username: '',
                nickname: '',
                avatar: '',
                description: ''
            }
        }
    },
    actions: {
        setToken(value: string) {
            this.satoken = value
        },
        setLoginId(value: string){
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