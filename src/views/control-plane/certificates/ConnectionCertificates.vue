<template>
  <button @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
    Sign New Certificate
  </button>

  <table class="table-auto w-full border border-gray-400 mt-5">
    <thead>
      <tr>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">Certificate Name</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400">Expiration</th>
        <th class="px-4 py-2 bg-gray-500 text-gray-100 border border-gray-400"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="certificate in data.certificates" :key="certificate.certificateId">
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
                <div class="mt-2.5">
                  <input
                    id="certificate-name"
                    type="text"
                    name="certificate-name"
                    autocomplete="given-name"
                    required="true"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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

const route = useRoute();
const connection_id = route.params.connection_id;
console.log(connection_id);

const data = ref({
  certificates: [],
});

async function loadConnectionCertificates() {
  const response = await httpClient.get(`/connection/${connection_id}/certificates`);
  data.value.certificates = response.data.certificates;
}

async function downloadPEMFiles(certificate) {
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
}

loadConnectionCertificates();

const showModal = ref(false);

const closeModal = function () {
  showModal.value = false;
};
const openModal = function () {
  showModal.value = true;
};
async function signNewCertificate(e) {
  const certificateName = Array.from(e.target.querySelectorAll('#certificate-name'))[0];
  await httpClient.post(`/connection/certificate`, {
    certificateName: certificateName.value,
    parentConnectionID: parseInt(connection_id, 10),
    commonName: 'nextdoor.com',
    dnsNames: ['nextdoor.com', '*.nextdoor.com'],
  });
  loadConnectionCertificates();
  showModal.value = false;
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
