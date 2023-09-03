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

  <button @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
    Sign New Certificate
  </button>

  <table class="table-auto w-full border border-gray-400 mt-5">
    <thead>
      <tr>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">ID</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">Certificate Name</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">Expiration</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="certificate in data.certificates" :key="certificate.certificateId">
        <td class="px-4 py-2 border border-gray-400">
          <span
            class="cursor-pointer inline-flex m-1 items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 hover:text-green-500 active:text-green-700 ring-1 ring-inset ring-green-600/20"
            @click.prevent="copyToClipboard(certificate.certificateId)"
            >{{ certificate.certificateId }} <DocumentDuplicateIcon class="h-4 w-4 ml-1"
          /></span>
        </td>
        <td class="px-4 py-2 border border-gray-400">{{ certificate.certificateName }}</td>
        <td class="px-4 py-2 border border-gray-400 text-right">{{ certificate.expiration }}</td>
        <td class="px-4 py-2 border border-gray-400 text-right">
          <a href="#" @click.prevent="downloadPEMFiles(certificate)">Download PEM Files</a>
        </td>
      </tr>
    </tbody>
  </table>

  <transition name="modal-fade">
    <div
      v-if="showModal"
      class="fixed bg-black bg-opacity-50 inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto"
    >
      <div class="relative bg-white w-1/2 md:w-1/3 mx-auto p-8 rounded-lg shadow-lg">
        <div v-if="requestErrorDialog" class="rounded-md bg-red-50 p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                We failed to process your request, please check your request and try again.
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
            @submit.prevent="signNewCertificate"
          >
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div>
                <label
                  for="certificate-name"
                  class="block text-sm font-semibold leading-6 text-gray-900"
                  >Certificate name</label
                >
                <div class="mt-1">
                  <input
                    id="certificate-name"
                    type="text"
                    name="certificate-name"
                    autocomplete="off"
                    required="true"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label for="common-name" class="block text-sm font-semibold leading-6 text-gray-900"
                  >Common name</label
                >
                <div class="mt-1">
                  <input
                    id="common-name"
                    type="text"
                    name="common-name"
                    autocomplete="off"
                    required="true"
                    placeholder="example.com"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <small class="text-gray-400">A common name for the certificate</small>
                </div>
              </div>
              <div>
                <label for="dns-names" class="block text-sm font-semibold leading-6 text-gray-900"
                  >DNS names</label
                >
                <div class="mt-1">
                  <input
                    id="dns-names"
                    type="text"
                    name="dns-names"
                    autocomplete="off"
                    required="true"
                    placeholder="example.com, www.example.com, *.example.com"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <small class="text-gray-400"
                    >A comma seperated list of DNS names for the certificate</small
                  >
                </div>
              </div>
              <div>
                <button
                  id="form-submit"
                  type="submit"
                  class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign New Certificate
                </button>
              </div>
            </div>
          </form></slot
        >
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
import { useRoute } from 'vue-router';
import httpClient from '@/http-service';
import downloadFile from '@/helpers/fileDownload.js';
import parseFormElements from '@/helpers/formParser.js';
import {
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/vue/24/outline';

const route = useRoute();
const connection_id = route.params.connection_id;
console.log(connection_id);

const data = ref({
  certificates: [],
});

const requestError = ref(false);
const networkError = ref(false);

const requestErrorDialog = ref(false);
const networkErrorDialog = ref(false);

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

async function loadConnectionCertificates() {
  requestError.value = false;
  networkError.value = false;
  try {
    const response = await httpClient.get(`/connection/${connection_id}/certificates`);
    data.value.certificates = response.data.certificates;
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

async function downloadPEMFiles(certificate) {
  requestError.value = false;
  networkError.value = false;
  try {
    const response = await httpClient.get(`/certificate/${certificate.certificateId}`);
    downloadFile(
      `${response.data.certificate.certificateName}.crt`,
      response.data.certificate.certificatePEM
    );
    if (response.data.certificate.privateKeyPEM)
      downloadFile(
        `${response.data.certificate.certificateName}.key`,
        response.data.certificate.privateKeyPEM
      );
    const certBundle = response.data.intermediateCA + response.data.rootCA;
    downloadFile(`${response.data.certificate.certificateName} CA Bundle.crt`, certBundle);
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

loadConnectionCertificates();

const showModal = ref(false);

const closeModal = function () {
  showModal.value = false;
};
const openModal = function () {
  requestErrorDialog.value = false;
  networkErrorDialog.value = false;
  showModal.value = true;
};
async function signNewCertificate(e) {
  requestErrorDialog.value = false;
  networkErrorDialog.value = false;
  const submittedElements = {};
  const submittedInfo = {};
  parseFormElements(e.target, submittedInfo, submittedElements);
  submittedElements['form-submit'].disabled = true;
  const dnsNames = submittedInfo.dnsNames.split(/,\s*/g);
  try {
    await httpClient.post(`/connection/certificate`, {
      certificateName: submittedInfo.certificateName,
      parentConnectionID: parseInt(connection_id, 10),
      commonName: submittedInfo.commonName,
      dnsNames: dnsNames,
    });
    submittedElements['form-submit'].disabled = false;
    loadConnectionCertificates();
    showModal.value = false;
  } catch (error) {
    submittedElements['form-submit'].disabled = false;
    if (error.code == 'ERR_NETWORK') {
      networkErrorDialog.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      requestErrorDialog.value = true;
      return;
    }
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
