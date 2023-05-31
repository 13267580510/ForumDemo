import {defineStore} from "pinia";

export const useIssueStore = defineStore('issue', {
    state() {
        return {
            IssueList:[{}],
            IssueListCopy:[{}]
        }
    },
    actions:{
        getIssueList(){
            IssueService.findAllWithPaging().then((res)=>{
                this.IssueList = res.data.data.content;
                this.IssueListCopy = res.data.data.content;
            })
        },
        searchIssue(WordKey){
            if(WordKey){
                let KeyArr = WordKey.split("");
                let Keys = [];
                for(let i =0;i<KeyArr.length;i++){
                    if(i==KeyArr.length-1){
                        Keys.push(KeyArr[i]);
                    }else
                    {Keys.push(KeyArr[i],"|")};
                }
                let key = Keys.join("");
                // console.log(key);

                let re = new RegExp(`${key}`,'g')

            const newArr = this.IssueListCopy.filter((item)=>{
                    if(re.test(item.title)){
                        console.log(re);
                        console.log(item.title);
                        return item
                    }
                })
                this.IssueList = newArr;
                return false;
            }else{
                this.IssueList = this.IssueListCopy;
            }
        }
    },
    persist: {
        enabled: true
    }
})