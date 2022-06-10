<template>
    <div></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class confirm extends Vue {
    @Prop()
    public name!: string;
    mounted() {

    if(this.name === "") {
        return;
    }

    const cookie = document.cookie;

    console.log(cookie);

    const only_first = cookie.split('%');

    if(only_first.length  < 2) {
        location.replace('/addInfo/login');
        return;
    }

    console.log(only_first);

    let send_data;

    if(only_first[0].includes('key=')) {
        //25
        send_data = only_first[0].slice(25);
    } else {
        //8
        send_data = only_first[1].slice(8);
    }

    //const name = this.$store.state.username;

    this.$axios.get('confirm_token', {
        params: {
            username: this.name,
            divided_back: send_data,
        }
    })
    .then((response) => {
        console.log(response.data);
        const which_num = response.data;

        console.log('yes');
        console.log(which_num.true_or_false);

        if(which_num.true_or_false === false) {
            console.log('yes');
            location.replace('/addInfo/login');
        }
    })
    .catch((err) => {
        console.log(err);
    });
    }
}
</script>