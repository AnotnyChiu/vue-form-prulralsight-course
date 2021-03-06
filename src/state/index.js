import {ShippingAddressModel, BillingAddressModel} from '../models/addressModel'
import CreditcardModel from '../models/creditcardModel'
import {reactive, ref} from 'vue'
import useVuelidate from '@vuelidate/core'

// could just export class
// but since the main purpose is for all files to share the same object
// so we return the instance rather than class(which will make them create seperate instances)
// now this become a singleton
export default{
    shipping: reactive(new ShippingAddressModel()),
    billing: reactive(new BillingAddressModel()),
    creditcard: reactive(new CreditcardModel()),
    errorMessage: ref(""),

    toModel(){
        const rules =  {
            billing: this.billing.rules,
            shipping: this.shipping.rules,
            creditcard: this.creditcard.rules
        }

        return useVuelidate(rules, this)
    }
}