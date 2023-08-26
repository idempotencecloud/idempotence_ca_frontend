<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div v-if="onboardingError" class="rounded-md bg-red-50 p-4 mb-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            Your onboarding request failed to complete. Please check the onboarding link and try
            again.
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
              We could not connect to the network. Please check your network connection and try
              again.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true"
    >
      <div
        class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div v-if="showCompanyForm">
      <CompanyInfoForm :handle-submit="companyFormSubmission" />
    </div>
    <div v-else>
      <IndividualInfoForm :handle-submit="individualFormSubmission" :email="email" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import httpClient from '../http-service';
import parseFormElements from '../helpers/formParser';
import router from '@/router';
import { useRoute } from 'vue-router';
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';
const route = useRoute();

const email = ref(route.params.email);

const mode = route.params.mode;

const onboardingToken = route.params.onboarding_token;

const networkError = ref(false);
const onboardingError = ref(false);

const showCompanyForm = ref(false);
let submittedInfo = {};
let submittedElements = {};
function individualFormSubmission(e) {
  console.log('individualFormSubmission');
  console.log(e);
  parseFormElements(e.target, submittedInfo, submittedElements);
  submittedElements['form-submit'].disabled = true;
  if (submittedInfo['province']) {
    submittedInfo['state'] = submittedInfo['province'];
  }
  if (submittedInfo['postalCode']) {
    submittedInfo['zipCode'] = submittedInfo['postalCode'];
  }
  if (submittedInfo['password'] != submittedInfo['confirmPassword']) {
    alert('Your password confirmation does not match.');
    submittedElements['password'].focus();
    submittedElements['form-submit'].disabled = false;
    return;
  }
  submittedElements['form-submit'].disabled = false;
  if (mode == 'agent') {
    companyFormSubmission(e);
  } else {
    showCompanyForm.value = true;
  }
}
async function companyFormSubmission(e) {
  networkError.value = false;
  onboardingError.value = false;
  console.log('companyFormSubmission');
  console.log(e);
  submittedInfo['company'] = {};
  if (mode == 'agent') {
    submittedInfo['company']['companyName'] = 'Ignore';
  }
  parseFormElements(e.target, submittedInfo['company'], submittedElements);
  submittedElements['form-submit'].disabled = true;
  //Concat street address
  submittedInfo['company']['streetAddress'] =
    submittedInfo['company']['mailingAddress1'] + ' ' + submittedInfo['company']['mailingAddress2'];
  //Translate postal code
  if (submittedInfo['company']['province']) {
    submittedInfo['company']['state'] = submittedInfo['company']['province'];
  }
  if (submittedInfo['company']['postalCode']) {
    submittedInfo['company']['zipCode'] = submittedInfo['company']['postalCode'];
  }
  submittedInfo['onboardingTicket'] = onboardingToken;
  try {
    // Perform the POST request using Axios and the HTTP service
    const response = await httpClient.post('/onboard', submittedInfo);
    // Handle the successful response
    console.log('POST request successful:', response.data);
    try {
      const response = await httpClient.post('/login', submittedInfo);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log('POST request successful:', response.data);
        router.push('/control-plane');
      } else {
        router.push({ name: 'Login' });
      }
    } catch (error) {
      submittedElements['form-submit'].disabled = false;
      router.push({ name: 'Login' });
    }
  } catch (error) {
    // Handle errors
    submittedElements['form-submit'].disabled = false;
    window.scrollTo(0, 0);
    if (error.code == 'ERR_NETWORK') {
      console.log('Network error');
      networkError.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      console.error('Onboarding error');
      onboardingError.value = true;
      return;
    }
  }
}
</script>
<script>
import IndividualInfoForm from '../components/InidividualInfoForm.vue';
import CompanyInfoForm from '../components/CompanyInfoForm.vue';
export default {
  components: {
    IndividualInfoForm,
    CompanyInfoForm,
  },
};
</script>
