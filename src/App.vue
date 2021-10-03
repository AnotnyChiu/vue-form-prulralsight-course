<template>
  <div>
    <Error :message="errorMessage"/>
    <payment-view/>
  </div>
</template>

<script>
// import { ref } from 'vue'
import PaymentView from './views/PaymentView.vue'
import Error from './components/Error.vue'
import state from './state'

export default{
  components:{
    PaymentView,
    Error
  },
  setup() {
    // const errorMessage = ref('')

    // const reportError = (msg)=>{
    //   errorMessage.value = msg
    // }

    return{
      errorMessage: state.errorMessage, // bind what you return to dom from central state
      // reportError
    }
  },
}

// note* want your intalled package to also written in package.json
// >> run --save  e.g. npm install vuelidate --save
</script>

