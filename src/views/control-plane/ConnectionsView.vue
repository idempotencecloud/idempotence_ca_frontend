<template>
  <h1 class="leading-20">Connections Awaiting Your Approval</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div
      v-for="connection in data.caConnectionsPendingYourApproval"
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
