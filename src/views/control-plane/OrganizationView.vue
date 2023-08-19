<template>
  <h1 class="leading-20">Organization View</h1>
  <div>
    <button
      @click.prevent="showModal = true"
      type="button"
      class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      Add Agent to Company
    </button>
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
    <div
      v-for="agent in data.agents"
      :key="agent.ID"
      class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div class="flex-shrink-0">
        {{ agent.emailAddress }}
      </div>
      <div class="min-w-0 flex-1">
        <div class="focus:outline-none">
          <p class="text-sm font-medium text-gray-900">
            {{ agent.firstName }} {{ agent.lastName }}
          </p>
          <p class="truncate text-sm text-gray-500">IAL: {{ agent.identityAssuranceLevel }}</p>
          <p class="truncate text-sm text-gray-500">
            Administrator: {{ agent.isAdministrator ? 'Yes' : 'No' }}
            <a
              v-if="!agent.isAdministrator && agent.identityAssuranceLevel > 0"
              href="#"
              class="text-blue-500 hover:text-blue-600"
              @click.prevent="makeAdministrator(agent.emailAddress, agent.ID)"
              >(Make Administrator)</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal-fade">
    <div
      v-if="showModal"
      class="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
    >
      <div class="relative bg-white w-1/2 md:w-1/3 mx-auto p-8 rounded-lg shadow-lg">
        <slot
          ><form
            action="#"
            method="POST"
            class="mx-auto max-w-xl"
            @submit.prevent="addCompanyAgent"
          >
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div>
                <label
                  for="email-address"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >New Agent Email Address</label
                >
                <div class="mt-1">
                  <input
                    id="email-address"
                    type="email"
                    name="email-address"
                    autocomplete="off"
                    required="true"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div class="text-right">
                <button
                  id="form-submit"
                  type="submit"
                  class="inline-flex rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /> Add Agent
                </button>
              </div>
            </div>
          </form></slot
        >
        <!-- Close button -->
        <button
          class="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600"
          @click="showModal = false"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid';

import httpClient from '@/http-service';
import { ref } from 'vue';
import parseFormElements from '@/helpers/formParser.js';

const showModal = ref(false);

const data = ref({
  agents: [],
});

async function makeAdministrator(emailAddress, id) {
  ///company/administrator
  if (confirm(`Are you sure you want to assign administrative rights to ${emailAddress}?`)) {
    await httpClient.post('/company/administrator', {
      agentId: id,
    });
    loadAgents();
  }
}

async function addCompanyAgent(e) {
  let submittedInfo = {};
  let submittedElements = {};
  parseFormElements(e.target, submittedInfo, submittedElements);
  const response = await httpClient.post('/agent/add', submittedInfo);
  console.log(response.data);
  showModal.value = false;
  loadAgents();
}

async function loadAgents() {
  const response = await httpClient.get('/company/agents');
  data.value.agents = response.data.agents;
}

loadAgents();
</script>

<style>
.leading-20 {
  line-height: 4.25em;
}
</style>
