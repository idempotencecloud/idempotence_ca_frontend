<template>
  <h1 class="leading-20">Active Certificate Connections</h1>
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
              <DocumentMagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
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
</template>

<script setup>
import {
  XMarkIcon,
  DocumentMagnifyingGlassIcon,
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
watch(
  () => store.state.agent, // Replace 'someState' with the name of the state you want to watch
  () => {
    loadActiveConnections(store.state.agent);
  }
);
loadActiveConnections(store.state.agent);
</script>

<style>
.leading-20 {
  line-height: 4.25em;
}
</style>
