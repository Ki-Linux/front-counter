<template>
    <div id="bord_up">
        <div class="contents_item" v-for="(show_word_img, indexImg) in showImageWord" :key="indexImg">
            <p v-if="$store.state.back_data[4] === 'img'">
                <img :src="show_word_img" alt="select_img">
            </p>
            <p v-else>{{ show_word_img }}</p>
        </div>
        <div class="leftover">
            <p v-if="$store.state.back_data[0] == '＞'">
                残り: {{ backTargetData - showData }}
            </p>
            <p v-else>残り: {{ showData - backTargetData }}</p>
        </div>
        <transition name="slide">
            <div class="select_bord" v-if="$store.state.select_plan !== 'free' && showSelect">
                <ul v-for="(select_data, index) in back_select_data" :key="index">
                    <li v-if="$store.state.back_data[4] === 'img'" @click="chooseData(index)">
                        <img :src="base_url+select_data" alt="select_data">
                    </li>
                    <li v-else @click="chooseData(index)">
                        {{ select_data }}
                    </li> 
                </ul>  
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    @Component
    export default class bord extends Vue {
        back_select_data: string[] = [];
        base_url: string|undefined = "";
        showImageWord: string[] = [];

        get showData() {//free planのときのみ
            return this.$store.getters.showData;
        }

        get showSelect() {//選択肢の表示
            return this.$store.getters.showSelect;
        }
        
        get backTargetData() {//目標のデータ vuexから
            return this.$store.getters.backTargetData;
        }

        get showWordImg() {//img data vuexから show_data[1]
            let arrayWordImg: string[] = [];
            let into_data = this.$store.getters.showWordImg;//freeプランのときは同じ数を入れる
            for(let i=0; i < this.showData; i++) {
                if(this.$store.state.select_plan !== "free") {
                    into_data = this.$store.state.show_data[i + 1];//freeプラン以外のときは違うデータを代入する
                }

                //サーバーからの画像
                let image = into_data;
                if(this.$store.state.back_data[4] === "img") {
                    image = process.env.SERVER_URL + into_data;
                }
                
                arrayWordImg.splice(i, 0, image);
            }
            return arrayWordImg;
        }

        @Watch("showWordImg")
        public show_word_img(val: string[]): void {
            console.log('true of showWordImg');
            this.showImageWord = val;
        }

        mounted() {    
            this.base_url = process.env.SERVER_URL;
            const image_data = this.$store.state.back_select_data;
            for(let i=0; i < image_data.length; i++) {
                
                this.back_select_data.splice(i, 0, image_data[i]);
            }
            this.showImageWord = this.showWordImg;   
        }

        chooseData(choose_num: number) {//クリックした選択肢のデータ
            //選択した文字、画像データ 選択データを閉じる
            this.$store.dispatch("chooseData", [this.back_select_data[choose_num], false]);
            console.log(choose_num);
        }     
    }
</script>
<style lang="scss">
    @mixin tb {
        @media (max-width: 900px) {
            @content;
        }
    }

    #bord_up {
        width: 70vw;
        height: 100vh;
        background-color: rgba(255, 254, 173, 0.301);
        overflow-Y: scroll;
        display: flex;
        flex-wrap: wrap;
        p {
            font-size: 25px;
        }
        .contents_item {
            img {
                width: 110px;
            }
            p {
                padding: 5px;
            }
        }
        .leftover p {
            color:rgb(255, 115, 0);
        }
        //スライド 登場回だけ
        .slide-enter {
            opacity: 0;
            transform: translateY(100%);
        }
        .slide-enter-to {
            transform: translateX(0);
        }
        .slide-enter-active{
            transition: opacity 0.5s, transform 0.5s;
        }
        .select_bord {       
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            background-color:rgba(24, 24, 24, 0.8);       
            ul {
                font-size: 30px;
                color: white;
                list-style: none;
                float: left;

                @include tb {
                    font-size: 15px;
                }
                
                li:first-of-type {
                    margin-top: 20px;
                    margin-right: 20px;
                    
                    img {
                        background-color: rgba(255, 255, 255, 0.8);
                        width: 100px;
                        display: inline;
                        @include tb {
                            
                            width: 60px;
                        }
                    }                 
                }
            }
        }   
    }
</style>
