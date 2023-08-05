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

  <h1 class="leading-20">Active Connections</h1>
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li
      v-for="connection in data.activeConnections"
      :key="connection.to_agent.email"
      class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
    >
      <div class="flex flex-1 flex-col p-8">
        <h3 class="mt-6 text-sm font-medium text-gray-900">
          {{ connection.to_agent.firstName }} {{ connection.to_agent.lastName }}
        </h3>
        <dl class="mt-1 flex flex-grow flex-col justify-between">
          <dt class="sr-only">Company</dt>
          <dd class="text-sm text-gray-500">{{ connection.to_agent.company.companyName }}</dd>
          <dt class="sr-only">Email</dt>
          <dd class="text-sm text-gray-500">{{ connection.to_agent.emailAddress }}</dd>
          <dt class="sr-only">Identity</dt>
          <dd class="mt-3">
            <span
              class="cursor-pointer inline-flex m-1 items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 hover:text-green-500 active:text-green-700 ring-1 ring-inset ring-green-600/20"
              @click.prevent="copyToClipboard(connection.ID)"
              >ID: {{ connection.ID }} <DocumentDuplicateIcon class="h-4 w-4 ml-1"
            /></span>
            <span
              class="inline-flex m-1 items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20"
              >IAL: {{ connection.to_agent.identityAssuranceLevel }}</span
            >
          </dd>
        </dl>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <a
              href="#"
              class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <DocumentPlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              Certificates
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <a
              href="#"
              class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <XMarkIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              Disconnect
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <h1 v-if="data.caConnectionsPendingTheirApproval.length > 0" class="leading-20">
    Connections Awaiting Approval
  </h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
</template>

<script setup>
import {
  CheckIcon,
  XMarkIcon,
  DocumentPlusIcon,
  DocumentDuplicateIcon,
} from '@heroicons/vue/20/solid';

import httpClient from '@/http-service';
import { ref } from 'vue';
import { watch } from 'vue';
import { useStore } from 'vuex';
import processConnections from '../../helpers/connectionResolver';
const store = useStore();

const data = ref({
  activeConnections: [],
  caConnectionsPendingYourApproval: [],
  caConnectionsPendingTheirApproval: [],
});

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((err) => {
      console.error('Unable to copy text to clipboard:', err);
    });
};

async function acceptConnection(connection) {
  await httpClient.post('/connection/accept', {
    connectionId: connection.ID,
  });
  loadActiveConnections(store.state.agent);
  loadPendingConnections(store.state.agent);
}

async function declineConnection(connection) {
  await httpClient.post('/connection/decline', {
    connectionId: connection.ID,
  });
  loadActiveConnections(store.state.agent);
  loadPendingConnections(store.state.agent);
}

async function loadActiveConnections(agent) {
  //TODO: Handle errors, and promise all
  if (agent == null) return;
  console.log('Agent');
  console.log(agent.agent.ID);
  let path = '/connections/active';
  if (agent.agent.isAdministrator) {
    path = '/connections/company/active';
  }
  const response = await httpClient.get(path);

  if (response.data.activeConnections) {
    processConnections(agent, response.data.activeConnections);
    data.value.activeConnections = response.data.activeConnections;
    //data.value.activeConnections = [...data.value.activeConnections, ...data.value.activeConnections, ...data.value.activeConnections, ...data.value.activeConnections]
  }
  console.log(response.data.activeConnections);
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
    loadActiveConnections(store.state.agent);
    loadPendingConnections(store.state.agent);
  }
);
loadActiveConnections(store.state.agent);
loadPendingConnections(store.state.agent);
</script>

<style>
.leading-20 {
  line-height: 4.25em;
}
</style>
