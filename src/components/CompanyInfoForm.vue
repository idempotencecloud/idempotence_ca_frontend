<template>
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Company Onboarding
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
     Please provide your company's information below.
    </p>
  </div>
  <form
    action="#"
    method="POST"
    class="mx-auto mt-16 max-w-xl sm:mt-20"
    @submit.prevent="handleSubmit"
  >
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label
          for="company-name"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Company Name</label>
        <input
          id="company-name"
          type="text"
          name="company-name"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div class="sm:col-span-2">
        <label
          for="department"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Department</label>
        <input
          id="department"
          type="text"
          name="department"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div class="sm:col-span-2">
        <label
          for="country"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Country</label>
        <select
              id="country"
              name="country"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              @change="countryChange">
              <option
                v-for="country in countries"
                :key="country.name"
              >
                {{ country.name }}
              </option>
        </select>
      </div>
      <div v-if="usSelected" class="sm:col-span-2">
        <label
          for="ein-number"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >EIN Number</label>
        <input
          id="ein-number"
          type="text"
          name="ein-number"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div class="sm:col-span-2">
        <label
          for="mailing-address-1"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Mailing Address Line 1</label>
        <input
          id="mailing-address-1"
          type="text"
          name="mailing-address-1"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div class="sm:col-span-2">
        <label
          for="mailing-address-2"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Mailing Address Line 2</label>
        <input
          id="mailing-address-2"
          type="text"
          name="mailing-address-2"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div class="sm:col-span-2">
        <label
          for="city"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >City</label>
        <input
          id="city"
          type="text"
          name="city"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div v-if="usSelected" class="sm:col-span-2">
        <label
          for="state"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >State</label>
        <div class="relative mt-2.5">
          <div class="absolute inset-y-0 left-0 flex items-center">
            <label
              for="state"
              class="sr-only"
            >State</label>
            <select
              id="state"
              name="state"
              class="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option
                v-for="state in usStates"
                :key="state.name"
              >
                {{ state.abbreviation }}
              </option>
            </select>
          </div>
          <input
            id="zip-code"
            placeholder="Zip Code"
            type="text"
            name="zip-code"
            autocomplete="off"
            class="block w-full rounded-md border-0 px-3.5 py-2 pl-28 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div v-if="!usSelected" class="sm:col-span-2">
        <label
          for="province"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >State / Province</label>
        <input
          id="province"
          type="text"
          name="province"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div v-if="!usSelected" class="sm:col-span-2">
        <label
          for="postal-code"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Postal Code</label>
        <input
          id="postal-code"
          type="text"
          name="postal-code"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
    </div>
    <div class="mt-10">
      <button
        type="submit"
        class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Onboard
      </button>
    </div>
  </form>
</template>
  
<script setup>
import { usStates } from '../data/states.js';
import { countries } from '../data/countries.js';
import {ref} from 'vue'

const usSelected = ref(true)

function countryChange(e) {
  if (e.target.value == countries[0].name) {
    usSelected.value = true
  } else {
    usSelected.value = false
  }
}
</script>

<script>
export default {
  // Define the 'buttonClickHandler' prop to receive the function from the parent
  props: {
    handleSubmit: {
      type: Function,
      default: () => {},
    },
  },
};
</script>