<template>
  <table class="table-auto">
    <thead>
      <tr>
        <th>Certificate Name</th>
        <th>Expiration</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="certificate in data.certificates" :key="certificate.certificateId">
        <td>{{ certificate.certificateName }}</td>
        <td>{{ certificate.expiration }}</td>
        <td><a href="#" @click.prevent="downloadPEMFiles(certificate)">Download PEM Files</a></td>
      </tr>
    </tbody>
  </table>
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
</script>
