<template>
  <h1 v-if="data.caConnectionsPendingYourApproval.length > 0" class="leading-20">
    Connections Awaiting Your Approval
  </h1>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <li
      v-for="connection in data.caConnectionsPendingYourApproval"
      :key="connection.to_agent.email"
      class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="truncate text-sm font-medium text-gray-900">
              {{ connection.to_agent.firstName }} {{ connection.to_agent.lastName }}
            </h3>
          </div>
          <p class="mt-1 truncate text-sm text-gray-500">{{ connection.to_agent.emailAddress }}</p>
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <a
              href="#"
              @click.prevent="acceptConnection(connection)"
              class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm font-semibold text-gray-400 hover:text-green-400"
            >
              <CheckIcon class="h-5 w-5 transition-colors" aria-hidden="true" />
              <span class="text-gray-900">Accept</span>
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <a
              href="#"
              @click.prevent="declineConnection(connection)"
              class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm font-semibold text-gray-400 hover:text-red-400"
            >
              <XMarkIcon class="h-5 w-5 transition-colors" aria-hidden="true" />
              <span class="text-gray-900">Decline</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <h1 class="leading-20">Connections Awaiting Approval</h1>
  <div>
    <button
      @click.prevent="showModal = true"
      type="button"
      class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      <PaperAirplaneIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      Send Connection Requests
    </button>
  </div>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
    <div
      v-for="connection in data.caConnectionsPendingTheirApproval"
      :key="connection.to_agent.email"
      class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
    >
      <div class="flex-shrink-0">
        {{ connection.to_agent.emailAddress }}
      </div>
      <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">
            {{ connection.to_agent.firstName }} {{ connection.to_agent.lastName }}
          </p>
          <p class="truncate text-sm text-gray-500">
            IAL: {{ connection.to_agent.identityAssuranceLevel }}
          </p>
        </a>
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
            @submit.prevent="sendConnectionRequest"
          >
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div>
                <label
                  for="email-address"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Email Address</label
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
              <div>
                <label for="memo" class="block text-sm font-semibold leading-6 text-gray-900"
                  >Memo</label
                >
                <div class="mt-1">
                  <textarea
                    id="memo"
                    type="text"
                    name="memo"
                    autocomplete="off"
                    placeholder="Optional memoranmdum for the connection invitee."
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
                  <PaperAirplaneIcon class="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" /> Send
                  Connection Request
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
import { CheckIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid';

import httpClient from '@/http-service';
import { ref } from 'vue';
import { watch } from 'vue';
import { useStore } from 'vuex';
import processConnections from '../../helpers/connectionResolver';
import parseFormElements from '@/helpers/formParser.js';
const store = useStore();

import { useRoute } from 'vue-router';
const route = useRoute();

const action = route.params.action;

const data = ref({
  caConnectionsPendingYourApproval: [],
  caConnectionsPendingTheirApproval: [],
});

const showModal = ref(action == 'send-connection');

async function acceptConnection(connection) {
  await httpClient.post('/connection/accept', {
    connectionId: connection.ID,
  });
  loadPendingConnections(store.state.agent);
}

async function sendConnectionRequest(e) {
  const submittedElements = {};
  const submittedInfo = {};
  parseFormElements(e.target, submittedInfo, submittedElements);
  console.log(submittedInfo);
  await httpClient.post('/connection', submittedInfo);
  showModal.value = false;
  loadPendingConnections(store.state.agent);
}

async function declineConnection(connection) {
  await httpClient.post('/connection/decline', {
    connectionId: connection.ID,
  });
  loadPendingConnections(store.state.agent);
}

async function loadPendingConnections(agent) {
  if (agent == null) return;
  const response = await httpClient.get('/connections/pending');
  console.log(response.data);
  if (response.data.caConnectionsPendingYourApproval) {
    processConnections(agent, response.data.caConnectionsPendingYourApproval);
    data.value.caConnectionsPendingYourApproval = response.data.caConnectionsPendingYourApproval;
  }
  if (response.data.caConnectionsPendingTheirApproval) {
    processConnections(agent, response.data.caConnectionsPendingTheirApproval);
    data.value.caConnectionsPendingTheirApproval = response.data.caConnectionsPendingTheirApproval;
  }
}

watch(
  () => store.state.agent, // Replace 'someState' with the name of the state you want to watch
  () => {
    loadPendingConnections(store.state.agent);
  }
);
loadPendingConnections(store.state.agent);
</script>

<style>
.leading-20 {
  line-height: 4.25em;
}
</style>
