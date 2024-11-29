<template>
  <div v-if="requestError" class="rounded-md bg-red-50 p-4 mb-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          We failed to process your request, please try again later.
        </h3>
      </div>
    </div>
  </div>
  <div v-if="networkError" class="rounded-md bg-yellow-50 p-4 mb-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-800">Network connection error</h3>
        <div class="mt-2 text-sm text-yellow-700">
          <p>
            We could not connect to the network. Please check your network connection and try again.
          </p>
        </div>
      </div>
    </div>
  </div>
  <h1 class="leading-20">Organization</h1>
  <div>
    <button
      @click.prevent="openModal()"
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
      style="margin-bottom: 10px"
    >
      <div class="flex-shrink-0 textClipping">
        {{ agent.emailAddress }}
        <br v-if="store.state?.agent?.agent?.isAdministrator" />
        <Switch
          v-if="
            store.state?.agent?.agent?.isAdministrator && store.state?.agent?.agent?.ID != agent.ID
          "
          v-model="agent.active"
          class="group relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          :class="agent.active ? 'bg-blue-600' : 'bg-gray-200'"
          role="checkbox"
          aria-checked="false"
          @click.prevent="makeDisableUser(agent)"
        >
          <span
            aria-hidden="true"
            class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
            :class="agent.active ? '-translate-x-2.5' : 'translate-x-2.5'"
          ></span>
        </Switch>
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
      <div class="relative bg-white xl:w-1/3 lg:w-1/2 mx-auto p-8 rounded-lg shadow-lg">
        <div v-if="requestErrorDialog" class="rounded-md bg-red-50 p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ requestErrorDialogMessage }}
              </h3>
            </div>
          </div>
        </div>
        <div v-if="networkErrorDialog" class="rounded-md bg-yellow-50 p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">Network connection error</h3>
              <div class="mt-2 text-sm text-yellow-700">
                <p>
                  We could not connect to the network. Please check your network connection and try
                  again.
                </p>
              </div>
            </div>
          </div>
        </div>
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

import { Switch } from '@headlessui/vue';
import httpClient from '@/http-service';
import { ref } from 'vue';
import parseFormElements from '@/helpers/formParser.js';

import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
import { useStore } from 'vuex';

const showModal = ref(false);

const data = ref({
  agents: [],
});

const store = useStore();
const requestError = ref(false);
const networkError = ref(false);

const requestErrorMessageDefault =
  'We failed to process your request, please check your request and try again.';
const requestErrorDialogMessage = ref(requestErrorMessageDefault);
const requestErrorDialog = ref(false);
const networkErrorDialog = ref(false);

const openModal = function () {
  requestErrorDialog.value = false;
  networkErrorDialog.value = false;
  showModal.value = true;
};

async function makeDisableUser(agent) {
  const id = agent.ID;
  const emailAddress = agent.emailAddress;
  const localState = agent.active;
  networkError.value = false;
  requestError.value = false;
  let action = 'activate';
  if (agent.active) {
    action = 'deactivate';
  }
  if (confirm(`Are you sure you want to ${action} ${emailAddress}?`)) {
    agent.active = !agent.active;
    try {
      await httpClient.patch(`/company/agent/${id}/${action}`);
      //loadAgents();
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        networkError.value = true;
        agent.active = localState;
        return;
      }
      if (error.code == 'ERR_BAD_REQUEST') {
        requestError.value = true;
        agent.active = localState;
        return;
      }
    }
  }
}

async function makeAdministrator(emailAddress, id) {
  networkError.value = false;
  requestError.value = false;
  ///company/administrator
  if (confirm(`Are you sure you want to assign administrative rights to ${emailAddress}?`)) {
    try {
      await httpClient.post('/company/administrator', {
        agentId: id,
      });
      loadAgents();
    } catch (error) {
      if (error.code == 'ERR_NETWORK') {
        networkError.value = true;
        return;
      }
      if (error.code == 'ERR_BAD_REQUEST') {
        requestError.value = true;
        return;
      }
    }
  }
}

async function addCompanyAgent(e) {
  let submittedInfo = {};
  let submittedElements = {};
  networkErrorDialog.value = false;
  requestErrorDialog.value = false;
  parseFormElements(e.target, submittedInfo, submittedElements);
  submittedElements['form-submit'].disabled = true;
  try {
    await httpClient.post('/agent/add', submittedInfo);
    //console.log(response.data);
    submittedElements['form-submit'].disabled = false;
    showModal.value = false;
    loadAgents();
  } catch (error) {
    submittedElements['form-submit'].disabled = false;
    if (error.code == 'ERR_NETWORK') {
      networkErrorDialog.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      requestErrorDialogMessage.value = error.response.data.message;
      requestErrorDialog.value = true;
      return;
    }
  }
}

async function loadAgents() {
  requestError.value = false;
  networkError.value = false;
  try {
    const response = await httpClient.get('/company/agents');
    data.value.agents = response.data.agents;
  } catch (error) {
    if (error.code == 'ERR_NETWORK') {
      networkError.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      requestError.value = true;
      return;
    }
  }
}

loadAgents();
</script>

<style>
.leading-20 {
  line-height: 4.25em;
}
.textClipping {
  max-width: 50%;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
