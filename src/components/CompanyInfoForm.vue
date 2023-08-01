<template>
  <div class="mx-auto max-w-2xl text-center">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Company Agent Onboarding
    </h2>
    <p class="mt-2 text-lg leading-8 text-gray-600">
      Please fill the form belolw, to onboard yourself as a company agent.
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
      <div class="sm:col-span-2">
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
            id="drivers-lisence"
            placeholder="Zip Code"
            type="text"
            name="drivers-lisence"
            autocomplete="off"
            class="block w-full rounded-md border-0 px-3.5 py-2 pl-28 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>
    </div>
    <div class="mt-10">
      <button
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