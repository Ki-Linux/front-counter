<template>
    <div id="pop_up_name">
        <div class="title_desc">
            <h1>完成しました!!</h1>
            <p>完成したものを投稿しますか?</p>
        </div>
        <div class="select_button">
            <button @click="yesClick">はい</button>
            <button @click="noClick">いいえ</button>
        </div> 
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class popUpName extends Vue {
    yesClick() {
        
        this.$router.push('/myaccount/mypage/edit/editNum?contents=new_post');
    }
    noClick() {
        
        this.$router.push('/myaccount/mypage/album_select/choose_album');
    }
}
</script>
<style lang="scss">
.select_button {
    font-size: 30px;
    text-align: center;
    margin-top: 30px;
    button {
        padding: 10px 20px;
        background-color: rgb(199, 199, 255);
        
        &:first-of-type {
            margin-right: 15px;
            padding: 10px 30px;
            background-color:rgb(255, 154, 154);
            
        }
    }
}
</style>
