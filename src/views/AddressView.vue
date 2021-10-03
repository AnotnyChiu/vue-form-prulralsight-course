<template>
  <!-- p-2 means padding 2 -->
  <div class="border rounded p-2">
    <slot/>
    <!-- slot is just the place holder for any customed block for this component -->
    <div class="form-group">
      <label for="add1">Address 1</label>
      <input
        type="text"
        id="add1"
        class="form-control"
        placeholder="Your Address 1"
        v-model="model.address1.$model"
        :disabled="isDisabled"
      />
      <ValidationMessage :model="model.address1"/>
    </div>
    <div class="form-group">
      <label for="add2">Address 2</label>
      <input
        type="text"
        id="add2"
        class="form-control"
        placeholder="Your Suite/Apartment"
        v-model="model.address2.$model"
        :disabled="isDisabled"
      />
      <ValidationMessage :model="model.address2"/>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="cityTown">City / Town</label>
        <input
          type="text"
          id="cityTown"
          class="form-control"
          placeholder="e.g. Sindan"
          v-model="model.city.$model"
          :disabled="isDisabled"
        />
        <ValidationMessage :model="model.city"/>
      </div>
      <div class="form-group col-md-3">
        <label for="state">State</label>
        <select id="state" class="form-control" v-model="model.state.$model" :disabled="isDisabled">
          <option
            v-for="s in states"
            :value="s.abbreviation"
            :key="s.abbreviation"
          >
            {{ stateFormat(s) }}
          </option>
        </select>
        <ValidationMessage :model="model.state"/>
      </div>
      <div class="form-group col-md-3">
        <label for="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          class="form-control"
          placeholder="e.g. 23156"
          v-model="model.postalCode.$model"
          :disabled="isDisabled"
        />
        <ValidationMessage :model="model.postalCode"/>
      </div>
    </div>
  </div>
</template>

<script>
import states from "../lookup/states";
import formatters from "../formatters"
import { required, minLength } from "@vuelidate/validators"
import useVuelidate from '@vuelidate/core';
import ValidationMessage from '../components/ValidationMessages'

export default {
  components:{
    ValidationMessage
  },
  props: {
    address: {
      type: Object,
    },
    isDisabled:{
        type: Boolean
    }
  },
  setup() {
    const model = address.toModel()

    return {
      states,
      model,
      ...formatters
    };
  },
};
</script>