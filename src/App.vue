<template>
  <div>
    <h3>Payment</h3>
    <div v-if="err" class="alert alert-danger">{{ err }}</div>
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
            <div class="form-group">
              <label for="add1">Address 1</label>
              <input
                type="text"
                id="add1"
                class="form-control"
                placeholder="Your Address 1"
                v-model="payment.shipping.address1"
              />
            </div>
            <div class="form-group">
              <label for="add2">Address 2</label>
              <input
                type="text"
                id="add2"
                class="form-control"
                placeholder="Your Suite/Apartment"
                v-model="payment.shipping.address2"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="cityTown">City / Town</label>
                <input
                  type="text"
                  id="cityTown"
                  class="form-control"
                  placeholder="e.g. Sindan"
                  v-model="payment.shipping.city"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="state">State</label>
                <select
                  id="state"
                  class="form-control"
                  v-model="payment.shipping.state"
                >
                  <option
                    v-for="s in states"
                    :value="s.abbreviation"
                    :key="s.abbreviation"
                  >
                    {{ stateFormat(s) }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <label for="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  class="form-control"
                  placeholder="e.g. 23156"
                  v-model="payment.shipping.postalCode"
                />
              </div>
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
            <div class="form-check">
              <input
                type="checkbox"
                id="sameAsShipping"
                class="form-check-input"
                v-model="payment.billing.sameAsShipping"
              />
              <label for="sameAsShipping" class="form-check-label"
                >Same as shipping?</label
              >
            </div>
            <div class="form-group">
              <label for="add1">Address 1</label>
              <input
                type="text"
                id="add1"
                class="form-control"
                placeholder="Your Address 1"
                v-model="payment.billing.address1"
                :disabled="payment.billing.sameAsShipping"
              />
            </div>
            <div class="form-group">
              <label for="add2">Address 2</label>
              <input
                type="text"
                id="add2"
                class="form-control"
                placeholder="Your Suite/Apartment"
                v-model="payment.billing.address2"
                :disabled="payment.billing.sameAsShipping"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="cityTown">City / Town</label>
                <input
                  type="text"
                  id="cityTown"
                  class="form-control"
                  placeholder="e.g. Sindan"
                  v-model="payment.billing.city"
                  :disabled="payment.billing.sameAsShipping"
                />
              </div>
              <div class="form-group col-md-3">
                <label for="state">State</label>
                <select
                  id="state"
                  class="form-control"
                  v-model="payment.billing.state"
                  :disabled="payment.billing.sameAsShipping"
                >
                  <option
                    v-for="s in states"
                    :value="s.abbreviation"
                    :key="s.abbreviation"
                  >
                    {{ stateFormat(s) }}
                  </option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <label for="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  class="form-control"
                  placeholder="e.g. 23156"
                  v-model="payment.billing.postalCode"
                  :disabled="payment.billing.sameAsShipping"
                />
              </div>
            </div>
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
import { ref, computed, watch } from "vue";
import states from "./lookup/states";
import months from "./lookup/months";
import formatters from "./formatters";

export default {
  setup() {
    const payment = ref({
      shipping: {},
      billing: {
        sameAsShipping: false
      },
      creditcard:{}
    });
    // don't have to specify default value. just bind it to the dom

    const err = ref("");

    function onSave() {
      err.value = "We can't save yet, we don't have api";
    }

    // fomatting the data using computed: not bind to object direcly but go through computed first!
    // use computed with get and set! > specify an object in computed
    const zipcode = computed({
      set: (val) => {
        // do formation
        if (val && typeof val == "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            // 注意!! 在dom先bind到computed object，在這邊才真的assing到物件上
            payment.value.postalCode = val;
          } // 如果太短或已經有dash
          else {
            payment.value.postalCode = `${val.substring(0, 5)}-${val.substring(5)}`;
          }
        }
      },
      get: () => payment.value.postalCode,
    });

    // handle same as shipping: use watch
    // 兩個callback, first is what you watch on, seconde is what you want to do
    watch(
      [payment.value.billing.sameAsShipping,payment.value.shipping], // for this have to set default value in ref
      ()=>{
        if(payment.value.billing.sameAsShipping){
          ['address1','address2','city','state','postalCode']
          .forEach(k=>{
            payment.value.billing[k] = payment.value.shipping[k]
          })
        }
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
      err,

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
