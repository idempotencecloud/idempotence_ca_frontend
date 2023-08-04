<template>
  <h1>Connections</h1>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <div v-for="connection in data.activeConnections" :key="connection.to_agent.email" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
      <div class="flex-shrink-0">
        {{ connection.to_agent.emailAddress }}
      </div>
      <div class="min-w-0 flex-1">
        <a href="#" class="focus:outline-none">
          <span class="absolute inset-0" aria-hidden="true" />
          <p class="text-sm font-medium text-gray-900">{{ connection.to_agent.firstName }} {{ connection.to_agent.lastName }}</p>
          <p class="truncate text-sm text-gray-500">IAL: {{ connection.to_agent.identityAssuranceLevel }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import httpClient from '@/http-service';
import {ref} from 'vue'
import { watch } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const data = ref({
  "activeConnections": []
})
async function loadActiveConnections(agent) {
  if(agent == null) return
  console.log('Agent')
  console.log(agent.agent.ID)
  const response = await httpClient.get('/connections/active');

  if(response.data.activeConnections) {
    let activeConnections = []
    for(let connection of response.data.activeConnections) {
      if(connection.vertexOneCertificateAuthority.ID != agent.agent.ID) {
        connection.to_agent = connection.vertexOneCertificateAuthority
      }
      if(connection.vertexTwoCertificateAuthority.ID != agent.agent.ID) {
        connection.to_agent = connection.vertexTwoCertificateAuthority
      }
      activeConnections.push(connection)
    }
    data.value.activeConnections = response.data.activeConnections
    data.value.activeConnections = [...data.value.activeConnections, ...data.value.activeConnections, ...data.value.activeConnections, ...data.value.activeConnections]
  }
  console.log(response.data.activeConnections)
}
watch(
  () => store.state.agent, // Replace 'someState' with the name of the state you want to watch
  () => {
    loadActiveConnections(store.state.agent)
  }
);
loadActiveConnections(store.state.agent)
</script>