import cardValidator from "card-validator"

export const creditcard = {
    $validator: value =>{
        // If the values is empty, we don't want it to show this error
        // since should use rewuired to do this
        if(typeof value === 'undefined' || value === null || value === '') return true

        return cardValidator.number(value).isValid;
    } ,
    $message: "Not a valid credit card number"
}