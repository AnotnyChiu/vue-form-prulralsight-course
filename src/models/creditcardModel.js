import {required} from '@vuelidate/validators'
import {creditcard} from '../validators'
import useVuelidate from '@vuelidate/core'
import {ref} from 'vue'

export default class CreditcardModel{
    number = ref('')
    nameOnCard = ref('')
    expirationMonth = ref(1)
    expirationYear = ref(2020)
    cvv = ref('')

    // centralize the validation stuff in the very beginning
    get rules(){
        return{
            // put the validators inside it, now we only have required(必填)
            number : { required, creditcard },
            nameOnCard : { required },
            expirationMonth : { required },
            expirationYear : { required },
            cvv : { required },
        }
    }

    // wrap the whole object with the rules
    toModel(){
        return useVuelidate(this.rules, this)
    }
}