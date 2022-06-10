<template>
    <div id="myname">
        <div class="pop_up" v-if="show_pop">
           <pop_up class="pop" v-if="show_pop" @pop_up_show="popShow"/>
        </div>
        <reminder_name/>
        <profile_name/>
        <div class="to_album">
            <button @click="toAlbum">マイアルバム</button>
        </div>
        <div class="up_down_button">
            <button @click="toSelectPage">カウントする</button>      
            <ul>
                <li>
                  <span>
                    アップ
                  </span>
                  …目標値に向かってプラスのカウントを行う
                </li>
                <li>
                  <span>
                    ダウン
                  </span>
                  …現在値から0に向かってマイナスのカウントを行う
                </li>
            </ul>
        </div>
        
        <div class="option">
            <ul>
                <li>
                  <nuxt-link class="editor" to="/myaccount/mypage/profileEdit/change_profile">
                    プロフィール編集
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link class="editor" to="/myaccount/mypage/setting/option_mydata">
                    設定
                  </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="back_home">
          <back_home where_go="home"/>
        </div>
        <confirm_person :name="$route.query.myname"/>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import profileName from '@/components/mypage/profile.vue';
import reminderName from '@/components/mypage/reminder.vue';
import backHome from '@/components/back_button/back.vue';
import popUp from '@/components/pop_up/pop_up_two.vue';
import confirmPerson from '@/components/confirmation/confirm_person.vue';
@Component({//middleware
    middleware: 'reject',
    components: {
        'profile_name': profileName,
        'reminder_name': reminderName,
        'back_home': backHome,
        'pop_up': popUp,
        'confirm_person': confirmPerson,
    }
})
export default class myname extends Vue {
  show_pop: boolean = false;
  head() {
    return {
      title: 'マイページ'
    }
  }
  beforeMount() {
        
    const account_name = String(this.$route.query.myname);
    //localStorageのデータを削除
    this.$store.dispatch("planSelect_arrayDelete", account_name);
        
  }
  popShow(value: boolean) {
    this.show_pop = value;
  }
  toAlbum() {//アルバムへ
    this.$router.push('/myaccount/mypage/album_select/my_album');
  }
  toSelectPage() {
    this.show_pop = true;
  }
  
}
</script>
<style lang="scss">
@mixin sp {
    @media (max-width: 560px) {
      @content;
    }
  }

li {
    list-style: none;
}

 .to_album {
    float: left;
    margin: 20px 0 0 40px;
    font-size: 19px;
    button {
      background-color: beige;
    }
  }
.up_down_button {
    
    text-align: center;
    font-size: 50px;
    button {
      padding: 10px 30px;
      margin-right: 20px;
      background-color: rgb(236, 236, 236);
      color: rgb(29, 104, 0);

      @include sp {
        margin-top:20px;
        font-size: 25px;
      }
    
    }
    ul li {
      font-size: 30px;
      &:first-of-type span {
        color: rgb(104, 0, 0);
        font-weight: bold;
      }
      &:last-of-type span {
        color: rgb(0, 0, 104);
        font-weight: bold;
      }

      @include sp {

        padding: 20px;
        font-size: 25px;
      }
    }
    
}

.option {
  font-size: 25px;
  
  ul li {
    
    padding: 10px 0;
    .editor {
      color: rgb(0, 62, 73);
      text-decoration: none;
    }
  }
}

.back_home {
  position: relative;
  float: right;
  margin-top: -140px;
  padding: 30px;
  @include sp {

    margin-top: -50px;
  }
}
</style>