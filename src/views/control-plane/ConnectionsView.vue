<template>
  <h1 class="leading-20">Connections Awaiting Your Approval</h1>
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
              class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-2 text-sm font-semibold text-gray-900"
              @mouseover="isAcceptHovered = true"
              @mouseout="isAcceptHovered = false"
            >
              <CheckIcon
                :class="`h-5 w-5 transition-colors ${
                  isAcceptHovered ? 'text-green-400' : 'text-gray-400'
                }`"
                aria-hidden="true"
              />
              Accept
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <a
              href="#"
              class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-2 text-sm font-semibold text-gray-900"
              @mouseover="isDeclineHovered = true"
              @mouseout="isDeclineHovered = false"
            >
              <XMarkIcon
                :class="`h-5 w-5 transition-colors ${
                  isDeclineHovered ? 'text-red-400' : 'text-gray-400'
                }`"
                aria-hidden="true"
              />
              Decline
            </a>
          </div>
        </div>
      </div>
    </li>
  </ul>

  <h1 class="leading-20">Active Connections</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="connection in data.activeConnections"
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

  <h1 class="leading-20">Connections Awaiting Approval</h1>
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
import { CheckIcon, XMarkIcon } from '@heroicons/vue/20/solid';

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

const isAcceptHovered = ref(false);
const isDeclineHovered = ref(false);

async function loadActiveConnections(agent) {
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
  if (response.data.activeConnections) {
    processConnections(agent, response.data.activeConnections);
    data.value.activeConnections = response.data.activeConnections;
  }
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
