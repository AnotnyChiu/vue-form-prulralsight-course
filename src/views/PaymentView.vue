<template>
  <div>
    <h3>Payment</h3>
    <!-- novalidate: don't let the browser validate for me -->
    <!-- we want to take control of it -->
    <!-- and we're running a form event here, so doing @submit here rather than @click as the submit button -->
    <!-- since you may have several ways to submit this button, do it here will make it happens in all cases (not just the submit button clicked) -->
    <form novalidate @submit.prevent="onSave">
      <!-- prevent here will prevent submit to reidrect to other pages -->
      <div class="row">
        <div class="col-md-6">
          <div>
            <strong> Shipping Information </strong>
            
            <div class="form-row">
              <AddressView 
              :address="payment.shipping"
              >
              <div class="form-group">
              <!-- label 的 for 屬性: 抓id之後，點該label會讓該id的物件自動focus -->
              <label for="name">Name</label>
              <input
                type="text"
                id="name"
                class="form-control"
                placeholder="Your Name"
                v-model="payment.shipping.fulName"
              />
            </div>
            <div class="form-group">
              <label for="company">Company</label>
              <input
                type="text"
                id="company"
                class="form-control"
                placeholder="Your Company"
                v-model="payment.shipping.company"
              />
            </div>
              </Addressview>
              <div class="form-group">
                <input type="submit" value="Next" class="btn btn-success" />
              </div>
            </div>
          </div>
        </div>

<!-- ------------------------------------------------------------------- -->
<!-- -----------------------   billing information  -------------------- -->
<!-- ------------------------------------------------------------------- -->

        <div class="col-md-6">
          <div>
            <strong> Billing Information </strong>
            <AddressView 
              :address="payment.billing"
              :isDisabled="payment.billing.sameAsShipping"
              >
              <div class="form-check">
              <input
                type="checkbox"
                id="sameAsShipping.value"
                class="form-check-input"
                v-model="payment.billing.sameAsShipping"
              />
              <label for="sameAsShipping.value" class="form-check-label"
                >Same as shipping?</label
              >
            </div>
            </AddressView>
            <div><strong>Credit Card</strong></div>
            <div class="form-group">
              <label for="ccNumber">Credit Card Number</label>
              <input type="text" class="form-control" v-model="payment.creditcard.number" id="ccNumber">
            </div>
            <div class="form-group">
              <label for="ccName">Credit Card Name</label>
              <input type="text" class="form-control" v-model="payment.creditcard.name" id="ccName">
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="expirationMonth">Expiration Month</label>
                <select 
                name="" 
                id="expirationMonth"
                v-model="payment.creditcard.expirationMonth"
                class="form-control"
                >
                  <option
                  v-for="m in months"
                  :key="m.number"
                  :value="m.number">{{m.name}}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="expirationYear">Expiration Year</label>
                <select 
                name="" 
                id="expirationYear"
                v-model="payment.creditcard.expirationYear"
                class="form-control"
                >
                  <option
                  v-for="y in years"
                  :key="y"
                  :value="y">{{y}}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-4">
                <label for="cvv">CVV Code</label>
                <input 
                type="text" 
                id="cvv"
                v-model="payment.creditcard.cvv"
                class="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div>
      <pre>
        <!-- use pre here, it will detect it as json object and do the format for us! -->
        {{payment}}
      </pre>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch } from "vue";
import states from "../lookup/states";
import months from "../lookup/months";
import formatters from "../formatters";
import AddressView from './AddressView.vue'
import state from '../state/index'

export default {
  components:{
    AddressView
  },
  setup(props, { emit }) {
    // 2種: 用target/opt 然後抓 target.emit 或者直接derefference emit出來
    const payment = reactive(state)



    function onSave() {
      // emit("onError", "We can't save yet, we don't have api")
      state.errorMessage.value = "We can't save yet, we don't have api" 
    }

    // fomatting the data using computed: not bind to object direcly but go through computed first!
    // use computed with get and set! > specify an object in computed
    const zipcode = computed({
      set: (val) => {
        // do formation
        if (val && typeof val == "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            // 注意!! 在dom先bind到computed object，在這邊才真的assing到物件上
            payment.postalCode = val;
          } // 如果太短或已經有dash
          else {
            payment.postalCode = `${val.substring(0, 5)}-${val.substring(5)}`;
          }
        }
      },
      get: () => payment.postalCode,
    });

    // handle same as shipping: use watch
    // 兩個callback, first is what you watch on, seconde is what you want to do
    watch(
      // [payment.billing.sameAsShipping.value,payment.shipping], // for this have to set default value in ref
      ()=> payment.billing.sameAsShipping,
      ()=>{
        // console.log(payment.billing.sameAsShipping)
        if(payment.billing.sameAsShipping){
          ['address1','address2','city','state','postalCode']
          .forEach(k=>{
            payment.billing[k] = payment.shipping[k]
          })
        }
      }
    )

    watch(
      ()=> payment.shipping.address1,
      ()=>{
        console.log('changed')
        payment.billing.sameAsShipping = false
      }
    )

    // creating the year array
    const years = Array.from({length:10}, (_,i)=> i+2020)

    return {
      // entity
      payment,
      states, //他沒有要變? 直接import之後pass出去
      months,
      years, 
      zipcode,

      //function
      onSave,
      ...formatters,
    };
  },
};

/*
筆記，建一個file之後export裡面的所有function，
在這邊import之後，可以用spread operation來取得所有的functions
才不用return一堆重複利用的東西

e.g formatter
*/
</script>
