export default function(context) {

    if(!context.store.getters.isAuthenticated) {
        console.log('no');
    }

}
