<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div
      class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true"
    >
      <div
        class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
    <div v-if="showCompanyForm">
      <CompanyInfoForm :handle-submit="companyFormSubmission" />
    </div>
    <div v-else>
      <IndividualInfoForm :handle-submit="individualFormSubmission" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import httpClient from '../http-service';
import { useRoute } from 'vue-router';

let onboardingToken = ''
onMounted(() => {
  // Access the onboarding_token parameter from the route object
  const route = useRoute();
  onboardingToken = route.params.onboarding_token;
});

const showCompanyForm = ref(false);
const kebabCaseRegex = /-./g
let submittedInfo = {}
let submittedElements = {}
function individualFormSubmission(e) {
  console.log("individualFormSubmission")
  console.log(e)
  for(let ele of e.srcElement) {
    submittedInfo[ele.id.replace(kebabCaseRegex, x=>x[1].toUpperCase())] = ele.value
    submittedElements[ele.id] = ele
  }
  submittedElements["form-submit"].disabled = true
  if(submittedInfo["province"]) {
    submittedInfo["state"] = submittedInfo["province"]
  }
  if(submittedInfo["postalCode"]) {
    submittedInfo["zipCode"] = submittedInfo["postalCode"]
  }
  if(submittedInfo['password'] != submittedInfo['confirmPassword']) {
    alert('Your password confirmation does not match.')
    submittedElements['password'].focus()
    submittedElements["form-submit"].disabled = false
    return
  }
  submittedElements["form-submit"].disabled = false
  showCompanyForm.value = true
}
async function companyFormSubmission(e) {
  console.log("companyFormSubmission")
  console.log(e)
  submittedInfo["company"] = {}
  for(let ele of e.srcElement) {
    submittedInfo["company"][ele.id.replace(kebabCaseRegex, x=>x[1].toUpperCase())] = ele.value
    submittedElements[ele.id] = ele
  }
  submittedElements["form-submit"].disabled = true
  //Concat street address
  submittedInfo["company"]["streetAddress"] = submittedInfo["company"]["mailingAddress1"] + " " + submittedInfo["company"]["mailingAddress2"]
  //Translate postal code
  if(submittedInfo["company"]["province"]) {
    submittedInfo["company"]["state"] = submittedInfo["company"]["province"]
  }
  if(submittedInfo["company"]["postalCode"]) {
    submittedInfo["company"]["zipCode"] = submittedInfo["company"]["postalCode"]
  }
  submittedInfo["onboardingTicket"] = onboardingToken
  try {
      // Perform the POST request using Axios and the HTTP service
      const response = await httpClient.post('/onboard', submittedInfo);

      // Handle the successful response
      console.log('POST request successful:', response.data);
    } catch (error) {
      // Handle errors
      submittedElements["form-submit"].disabled = false
      console.error('Error performing POST request:', error);
    }
}
</script>
<script>
import IndividualInfoForm from '../components/InidividualInfoForm.vue'
import CompanyInfoForm from '../components/CompanyInfoForm.vue'
export default {
    components: {
        IndividualInfoForm,
        CompanyInfoForm
    }
}
</script>