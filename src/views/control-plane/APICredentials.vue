<template>
  <div v-if="requestError" class="rounded-md bg-red-50 p-4 mb-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          We failed to load your API credentials, please try again later.
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

  <button @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
    Generate New API Credentials
  </button>

  <table class="table-auto w-full border border-gray-400 mt-5">
    <thead>
      <tr>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">
          API Credential Name
        </th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">API Key</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">Expiration</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="credential in data.credentials" :key="credential.credentialId">
        <td class="px-4 py-2 border border-gray-400">{{ credential.apiName }}</td>
        <td class="px-4 py-2 border border-gray-400">{{ credential.apiKey }}</td>
        <td class="px-4 py-2 border border-gray-400 text-right">{{ credential.expiration }}</td>
        <td class="px-4 py-2 border border-gray-400 text-center">
          <a href="#" @click.prevent="revokeCredential(credential.apiKey, credential.credentialId)"
            >Revoke</a
          >
        </td>
      </tr>
    </tbody>
  </table>

  <transition name="modal-fade">
    <div
      v-if="showModal"
      class="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
    >
      <div class="relative bg-white w-2/3 md:w-2/3 mx-auto p-8 rounded-lg shadow-lg">
        <slot v-if="!data.apiKey"
          ><form
            action="#"
            method="POST"
            class="mx-auto max-w-xl"
            @submit.prevent="createNewAPICredentials"
          >
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div>
                <label
                  for="api-key-name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >API Credential Name</label
                >
                <div class="mt-1">
                  <input
                    id="api-key-name"
                    type="text"
                    name="api-key-name"
                    autocomplete="off"
                    required="true"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  for="key-expiration"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Expiration</label
                >
                <div class="mt-1">
                  <select id="key-expiration" name="key-expiration" class="block w-full p-2 border">
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>1 month</option>
                    <option>6 months</option>
                    <option>1 year</option>
                    <option>Indefinite</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  id="form-submit"
                  type="submit"
                  class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  New API Credentials
                </button>
              </div>
            </div>
          </form></slot
        >
        <slot v-if="data.apiKey">
          <dl class="mt-1 flex flex-grow flex-col justify-between">
            <dt>API Key</dt>
            <dd class="text-sm text-gray-500">
              {{ data.apiKey }}
              <span
                class="cursor-pointer inline-flex m-1 px-2 items-center rounded-full bg-green-50 py-1 text-xs font-medium text-green-700 hover:text-green-500 active:text-green-700 ring-1 ring-inset ring-green-600/20"
                @click.prevent="copyToClipboard(data.apiKey)"
                ><DocumentDuplicateIcon class="h-4 w-4"
              /></span>
            </dd>
            <dt>API Secret</dt>
            <dd class="text-sm text-gray-500 break-all">
              {{ data.apiSecret }}
              <span
                class="cursor-pointer inline-flex m-1 px-2 items-center rounded-full bg-green-50 py-1 text-xs font-medium text-green-700 hover:text-green-500 active:text-green-700 ring-1 ring-inset ring-green-600/20"
                @click.prevent="copyToClipboard(data.apiSecret)"
                ><DocumentDuplicateIcon class="h-4 w-4"
              /></span>
            </dd>
          </dl>
          <small class="text-red-950"
            >API Secret is only revealed once, please me sure to securely save it.</small
          >
        </slot>
        <!-- Close button -->
        <button
          class="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600"
          @click="closeModal"
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
import { ref } from 'vue';
import httpClient from '@/http-service';
import parseFormElements from '@/helpers/formParser.js';
import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid';
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const data = ref({
  credentials: [],
  apiKey: '',
  apiSecret: '',
});

const networkError = ref(false);
const requestError = ref(false);

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

async function loadAPICredentials() {
  networkError.value = false;
  requestError.value = false;
  try {
    const response = await httpClient.get(`/api-credentials`);
    data.value.credentials = response.data.apiCredentials;
  } catch (error) {
    if (error.code == 'ERR_NETWORK') {
      console.log('Network error');
      networkError.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      console.error('Authentication error');
      requestError.value = true;
      return;
    }
  }
}

loadAPICredentials();

const showModal = ref(false);

const closeModal = function () {
  showModal.value = false;
};
const openModal = function () {
  data.value.apiKey = '';
  data.value.apiSecret = '';
  showModal.value = true;
};
async function createNewAPICredentials(e) {
  const submittedElements = {};
  const submittedInfo = {};
  parseFormElements(e.target, submittedInfo, submittedElements);
  console.log(submittedElements);
  console.log(submittedInfo);
  const credential = await httpClient.post(`/api-credential`, submittedInfo);
  console.log(credential);
  data.value.apiKey = credential.data.apiKey;
  data.value.apiSecret = credential.data.apiSecret;
  loadAPICredentials();
  // showModal.value = false;
}
async function revokeCredential(key, id) {
  if (confirm(`Are you sure you want to revoke API Key: ${key}?`)) {
    await httpClient.post(`/api-credential/revoke`, {
      apiCredentialId: id,
    });
    loadAPICredentials();
  }
}
</script>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Style the modal container */
.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

/* Style the modal close button */
.modal-close-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
