<template>
    <div id="send">
        <p>
            メールを送信しました。ご確認ください。
        </p>
        <button @click="back">戻る</button>
    </div>
</template>
<script lang="ts">
import { Vue,Component } from 'vue-property-decorator';
@Component
export default class send extends Vue {
    head() {
        return {
            title: 'パスワード確認完了'
        }
    }
    back() {
       
       this.$router.push('/addInfo/login');
    }
}
</script>
<style lang="scss">
#send {
    text-align: center;
    font-size: 18px;
    padding-top: 40px;
    button {
        -webkit-appearance: none;
        background-color: rgb(197, 197, 197);
        margin-top: 20px;
    }
}
</style>