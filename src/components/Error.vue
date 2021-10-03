<template>
    <div class="alert alert-danger" v-if="message">{{message}}</div>
</template>

<script>
// import {ref} from 'vue'
export default {
    // props are exposed to the ui already. don't assign it in setup
    props:{
        message:{
            type: String, // Number Boolean Array Date Function Symbol
            required: true
        }
    },

    // if want to do something with the props, can pass it as parameter
    setup(props) {
        console.log(props.message)

        return{
            
        }
    },
}
</script>