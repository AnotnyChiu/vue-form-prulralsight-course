import useVuelidate from '@vuelidate/core'
import {required} from '@vuelidate/validators'
import {ref} from 'vue'

class AddressModel{
    address1 = ref('')
    address2 = ref('')
    city = ref('')
    state = ref('')
    postalCode = ref('')

    get rules(){
        return{
            address1: { required, minLength: minLength(5) },
            address2: {},
            city: { required, minLength: minLength(2) },
            state: { required },
            postalCode: { required, minLength: minLength(5) },
        }
    }

    toModel(){
        return useVuelidate(this.rules, this)
    }
}

// inheritance: use extents
export class ShippingAddressModel extends AddressModel{
    fullname = ref('')
    company = ref('')

    get rules(){
        return Object.assign({
            fullName: {required},
            company: {}
        }, super.rules())
    }
}

export class BillingAddressModel extends AddressModel{
    sameAsShipping = ref(false)

    get rules(){
        return Object.assign({
            sameAsShipping: {}
        }, super.rules())
    }
}


// export default{
//     AddressModel,
//     ShippingAddressModel,
//     BillingAddressModel
// }