<template>
    <div id="change_profile"> 
        <form class="edit_profile" v-if="edit_contents" @submit.prevent="goChange">
            <div class="edit_image center" v-if="change_data[0].show_data">
                <img :src="change_data[0].img_name_comment" alt="change_img">
                <input type="file" name="change_image" ref="preview" @change="changeIcon">
            </div>
            <div v-if="change_data[1].show_data" class="center">
                <input type="text" v-model="change_data[1].img_name_comment" maxlength="9">
                <p>{{ cannot_name }}</p>
            </div>
            <div class="center" v-if="change_data[2].show_data">
                <textarea name="message" id="message_add" v-model="change_data[2].img_name_comment"></textarea>
            </div>
            <input class="send_change" type="submit" value="変更">
        </form>
        <div class="my_data_edit">
            <div class="title">
                <h1>プロフィール編集</h1>
            </div>
            <div class="my_data">
                <profile_data :can_click="clickCan" @send_data="sendData" @emit_id="emitId"/>
                <div class="comment" @click="changeComment">
                    <p>{{ change_data[2].img_name_comment }}</p>
                </div>
            </div>
            <div class="back_button">
                <back_button where_go="account"/>
            </div>
        </div>
        <confirm_person :name = "$store.state.username"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import profileData from '@/components/mypage/profile.vue';
import backButton from '@/components/back_button/back.vue';
import confirmPerson from '@/components/confirmation/confirm_person.vue';
@Component({
    middleware: 'reject',
    components: {
        'profile_data': profileData,
        'back_button': backButton,
        'confirm_person': confirmPerson,
    }
})
export default class change_profile extends Vue {
    clickCan: boolean = true;
    edit_contents: boolean = false;
    send_userId: number = 0;
    cannot_name: string = "";
    send_icon: any;
    change_data = [
        { 
            show_data: false,//image
            img_name_comment: require("@/static/profile/default_img.png"),  
            judge_number: 1
        },
        {
            show_data: false,//name
            img_name_comment: this.$store.state.username,  
            judge_number: 2
        },
        {
            show_data: false,//comment
            img_name_comment: "",  
            judge_number: 3
        },
    ];
    head() {
        return {
            title: 'プロフィール編集'
        }
    };

    send_image() {
        const formData = new FormData();
        formData.append('file', this.send_icon);
        formData.append('userId', String(this.send_userId));

        this.$axios.post('img_account_post', formData)
        .then((response) => {
            console.log(response.data);
            console.log(response.data.ui);
            const judge_data = response.data.judge_success;
            if(judge_data) {
                console.log('success')
                location.reload();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }
 
    sendData(value: string) {
        console.log(value);
        this.edit_contents = true;
        this.change_data[2].show_data = false;
        if(value === "img") {
            this.change_data[0].show_data = true;
            this.change_data[1].show_data = false;
            
            return;
        }
        this.change_data[1].show_data = true;
        this.change_data[0].show_data = false;
        
    }

    emitId(value:{ id: number, icon: string, comment: string }) {
        console.log(value);
        console.log(value.id + 'ui');
        
        this.send_userId = value.id;
        if(value.icon !== "not") {
            console.log(value.icon)
            const base_url = process.env.SERVER_URL;
            this.change_data[0].img_name_comment = base_url + value.icon;
        }
        
        this.change_data[2].img_name_comment = value.comment;
    }

    changeIcon(e: Event) {
        const file = (<HTMLInputElement>e.target).files![0];
        this.send_icon = file;
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.change_data[0].img_name_comment = reader.result;
            console.log(this.change_data[0]);
        })
        reader.readAsDataURL(file);
    }

    changeComment() {

        this.edit_contents = true;
        for(let i=0; i < 3; i++) {
            if(i === 2) {
                this.change_data[i].show_data = true;
                return;
            }
            this.change_data[i].show_data = false;
        }  
    }

    goChange() {
        let change_content: string = "";//送るデータ
        let judge_number: number = 3;//送る番号
        for(let i=0; i < 3; i++) {
            if(this.change_data[i].show_data) {//送るデータを決める
                change_content = this.change_data[i].img_name_comment;
                judge_number = i;
                if(judge_number === 0) {
                    this.send_image();
                    return;
                }
            }
            if(change_content === "") {//空欄のとき
                if(judge_number === 1) {
                    this.cannot_name = "名前が空欄です。";
                    return;//ここで止める
                } else if(judge_number === 2) {
                    change_content = "コメントはありません。";//止めない
                }
            }
        }

        console.log(this.send_userId);

        this.$axios.put('account_update/' + this.send_userId, {
            changeContent: change_content, 
            judgeNumber: judge_number,
        })
        .then((response) => {
            console.log(response.data);
            const judge_data = response.data.judge_success;
            console.log(judge_data);
            if(judge_data) {
                if(judge_number === 1) {
                    this.$store.dispatch("loginName", change_content);//ユーザーネームはvuex
                }
                location.reload();
                return;
            } 
            this.cannot_name = "この名前はすでにあります。";
            
        })
        .catch((err) => {
            console.log(err);
        });
    }
}
</script>
<style lang="scss">
@mixin sp {
  @media (max-width: 560px) {
    @content;
  }
}

#change_profile {

    @include sp {
        padding:0 20px 0 10px;
    }

    .title {
        text-align: center;
        padding: 30px 0;
    }

    .edit_profile {
        input {
            -webkit-appearance: none;
        }
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
        background-color: rgba(66, 66, 66, 0.8);
        padding: 50px;
        text-align: center;
        img {
            background-color: rgb(219, 219, 219);
            width: 130px;
            height: 130px;
            border-radius: 50%;
            margin: 30px auto;
        }
        .center {
            margin-top: 20px;
            input[type="text"] {
                padding: 5px;
                font-size: 30px;
            }   
            #message_add {
                padding: 5px;
                height: 7rem;
                font-size: 20px;
            }   
        }
        .send_change {
            font-size: 20px;
            margin-top: 20px;
            padding: 5px 12px;
            background-color: whitesmoke;
        }
    }
    .my_data_edit {       
        .my_data {
            display: inline-block;
            margin-left: 50%;
            transform: translateX(-50%);
            background-color: rgb(255, 244, 206);
            padding: 20px;
            @include sp {
                margin-left: 0%;
                transform: translateX(0%);
                margin:0 5px 0 7px;
            }
            .comment {
                margin: 60px auto;
                width: 300px;
                height: 200px;
                background-color: white;
                overflow-Y: scroll;
                p {
                    word-break: break-all;
                    font-size: 20px;
                    float: left;
                    padding: 10px;
                }
            } 
        }
        .back_button {
            margin: 40px;
            text-align: center;
        }
    }
    
    #profile {
        margin-left: 50%;
        transform: translateX(-50%);
        padding-top: 30px;
    }
    
}
</style>
