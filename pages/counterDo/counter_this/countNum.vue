<template>
    <div id="free_login">
        <div class="label">
            <top_label/><!-- topのラベル-->           
        </div>
        <div class="pop_up">
            <pop_up/><!-- ポップアップの表示-->   
        </div>
        <div class="contents">
            <div class="over">
                <target_number/><!-- 目標値と現在値 -->
            </div>
            <div class="under">
                <bord_up/><!--　ボード -->
                <calculation/><!-- ボードの中の数値 -->
            </div>    
        </div>
    </div>
</template>
<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    import topLabel from '@/components/count/top_label.vue';
    import targetNumber from '@/components/count/target_number.vue';
    import BordUp from '@/components/count/bord_up.vue';
    import calculations from '@/components/count/calculation_complete.vue';
    import popUp from '@/components/pop_up/pop_up_one.vue';
    @Component({
        components: {
            'top_label': topLabel,
            'target_number': targetNumber,
            'bord_up': BordUp,
            'calculation': calculations, 
            'pop_up': popUp,
        }
    })
    export default class free_up extends Vue {
        up_home: string[] = ["free"];//to prop "free"はフリープランかログインプランかの判定
        setting: [string, number, number, string] = ["", 0, 0, ""];
        only_number: number[] = [0, 0];
        head() {
            return {
                title: 'カウント'
            }
        }
    }
</script>
<style lang="scss">
    html {
        background-color: white;
    }

    #free_login .pop_up {
        padding-top: 5px;
    }

    .contents .over,.under {
        display: flex;
    }
</style>
