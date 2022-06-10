<template>
    <div id="complete_button">
        <button :class="{ Light_up: showData }" @click="complete">完成</button>
    </div> 
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class completeOption extends Vue {
    get backTargetData() {//目標のデータ　vuexから
        return this.$store.getters.backTargetData;
    }
    get showData() {//現在のデータ　vuexから
        if(this.$store.getters.showData === this.backTargetData) {
            const light = true;
            return light
        };
    }
    complete() {
        const vuexData = this.$store.state
        if(vuexData.show_data[0] === this.backTargetData) {
            console.log('complete!');
            this.$store.dispatch("changeClick", false);
                
        }
    }
}
</script>
<style lang="scss">
    @mixin tb {
        @media (max-width: 900px) {
            @content;
        }
    }
    #complete_button {
        margin-top: 80px;
        font-size: 50px;
        text-align: center;
        @include tb {
            margin-top: 40px;
            font-size: 30px;
        }
        button {
            -webkit-appearance: none;
            background-color: rgba(245, 245, 245, 0.7);
        }
        .Light_up {
            background-color: white;
        }
        
    }
</style>