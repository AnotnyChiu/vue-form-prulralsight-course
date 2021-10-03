import {ref} from 'vue'

class AddressModel{
    address1 = ref('')
    address2 = ref('')
    city = ref('')
    state = ref('')
    postalCode = ref('')
}

// inheritance: use extents
export class ShippingAddressModel extends AddressModel{
    fullname = ref('')
    company = ref('')
}

export class BillingAddressModel extends AddressModel{
    sameAsShipping = ref(false)
}


// export default{
//     AddressModel,
//     ShippingAddressModel,
//     BillingAddressModel
// }