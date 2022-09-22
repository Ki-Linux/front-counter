<template>
    <div id="login_select">
        <div class="select_button" :class="{ styleClass: index === 0, styleClassBottom: index == 1 }" v-for="(selector, index) in selectors" :key="selector.description">
            <p>{{ selector.description }}</p>
            <button @click="toPage(index)">
                {{ selector.url_button }}
            </button>
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'nuxt-property-decorator';

    @Component
    export default class loginSelect extends Vue {
        selectors: { description: string; url_button: string; } [] =  [
            {
                description: "マイページからカウントや投稿ができます。",
                url_button: "すでに登録済みの方",
            },
            {
                description: "フリーカウントはアカウント登録なしで気軽にできますが保存されません。",
                url_button: "フリーカウント",
            }
        ];
        head() {
            return {
                title: '選択',
                meta: [
                    { hid: 'description', name: 'description', content: 'ログインとフリーカウントのどちらかを選択できます。' }
                ]
            }
            
        }

        toPage(index: number) {
            const to_url = (url: string) => {
                this.$router.push(url);
            }
            
            switch(index) {
                case 0:
                    to_url("/addInfo/login");
                    break;
                case 1:
                    to_url("/counterDo/optionData/optionNum?select=free");
                    this.$store.dispatch("delete_contents", "only_name");
                    break; 
            }
        }
    }
</script>
<style lang="scss">
    #login_select {
        padding: 100px 0;
    }

    .select_button {
        font-size: 20px;
        padding: 40px 20px;
        text-align: center;
        
        button {
            -webkit-appearance: none;
            margin-top: 30px;
            padding: 10px 20px;
            font-size: 25px;
            color: rgba(36, 36, 36, 0.9);
            background-color:rgb(238, 238, 238);
        }
    }

    .styleClass {/*上*/
        background-color: rgba(200, 255, 0, 0.5);
        margin-bottom: 100px;
                
    }
    
    .styleClassBottom {/*下*/
        background-color: rgba(0, 225, 255, 0.5);
        
    }
</style>
