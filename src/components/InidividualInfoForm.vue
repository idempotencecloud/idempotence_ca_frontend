<template>
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Company Agent Onboarding
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Please fill the form below, to onboard yourself as an agent (certificate authority) of the company.
    </p>
  </div>
  <form
    action="#"
    method="POST"
    class="mx-auto mt-16 max-w-xl sm:mt-20"
    @submit.prevent="handleSubmit"
  >
    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label
          for="first-name"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >First name</label>
        <div class="mt-2.5">
          <input
            id="first-name"
            type="text"
            name="first-name"
            autocomplete="given-name"
            required="true"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div>
        <label
          for="last-name"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Last name</label>
        <div class="mt-2.5">
          <input
            id="last-name"
            type="text"
            name="last-name"
            autocomplete="family-name"
            required="true"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="email-address"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Email</label>
        <div class="mt-2.5">
          <input
            id="email-address"
            type="email"
            name="email-address"
            autocomplete="email"
            required="true"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Password</label>
        <div class="mt-2.5">
          <input
            id="password"
            type="password"
            name="password"
            required="true"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div>
        <label
          for="confirm-password"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Confirm Password</label>
        <div class="mt-2.5">
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required="true"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="phone-number"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Phone number</label>
        <div class="relative mt-2.5">
          <input
            id="phone-number"
            type="tel"
            name="phone-number"
            placeholder="+1 (555) 987-6543"
            autocomplete="tel"
            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
      <div class="sm:col-span-2">
        <label
          for="mailing-address"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Mailing Address Line 1</label>
        <input
          id="mailing-address"
          required="true"
          type="text"
          name="mailing-address"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div class="sm:col-span-2">
        <label
          for="mailing-address-second-line"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Mailing Address Line 2</label>
        <input
          id="mailing-address-second-line"
          type="text"
          name="mailing-address-second-line"
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
      <div class="sm:col-span-2">
        <label
          for="city"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >City</label>
        <input
          id="city"
          required="true"
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
            required="true"
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
          required="true"
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
          required="true"
          name="postal-code"
          autocomplete="off"
          class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
      </div>
      <div v-if="usSelected" class="sm:col-span-2">
        <label
          for="drivers-lisence-number"
          class="block text-sm font-semibold leading-6 text-gray-900"
        >Driver&#x27;s Lisence Number</label>
        <div class="relative mt-2.5">
          <div class="absolute inset-y-0 left-0 flex items-center">
            <label
              for="drivers-license-state"
              class="sr-only"
            >DL State</label>
            <select
              id="drivers-license-state"
              name="drivers-license-state"
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
            id="drivers-lisence-number"
            type="text"
            required="true"
            name="drivers-lisence-number"
            autocomplete="off"
            class="block w-full rounded-md border-0 px-3.5 py-2 pl-28 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
    </div>
    <div class="mt-10">
      <button
        id="form-submit"
        type="submit"
        class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Proceed
      </button>
    </div>
  </form>
</template>
  
<script setup>
import { usStates } from '../data/states.js';
import { countries } from '../data/countries.js';
import { ref } from 'vue'

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