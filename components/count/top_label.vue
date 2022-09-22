<template>
    <div id="top_label">
        <button @click="toHome">ホームに戻る</button>
        <p v-if="$store.state.back_data[0] === '＞'">アップ</p>
        <p v-else>ダウン</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class TopLabel extends Vue {
  toHome(): void {
    const vuexData = this.$store.state;
    if(vuexData.canClick) {//clickできるか(popup)
        let url;
        if(vuexData.select_plan == "free" && vuexData.username == "") {
          url = ('/');
        } else {
          url = ('/myaccount/mypage/myaccountpage?myname=' + vuexData.username);          
        }
        this.$router.push(url);      
    }        
  }
}
</script>
<style lang="scss">
  #top_label {
    background-color: rgba(0, 5, 34, 0.6);
    padding: 20px;
    button {
      background-color: rgba(255, 255, 255, 0.8); 
      font-size: 25px;
      margin-left: 10px;
    }
    p {
      float: right;
      color: rgba(255, 255, 255, 0.9);
      font-size: 30px;
      line-height: 40px;
      margin-right: 40px;
    }
  } 
</style>
