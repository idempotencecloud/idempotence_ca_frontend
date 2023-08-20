<template>
  <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
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
  </div>
  <form
    action="#"
    method="POST"
    class="mx-auto mt-16 max-w-xl sm:mt-20"
    @submit.prevent="declineInvite"
    v-if="!message"
  >
    <p class="text-center m-5">Are you sure you want to decline this invitation?</p>
    <button
      id="form-submit"
      type="submit"
      class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Yes, Decline
    </button>
  </form>
  <p v-if="message" class="text-center mt-21">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';
import httpClient from '../http-service';
// import parseFormElements from '../helpers/formParser';
// import router from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute();

const email = route.params.email;
const onboardingToken = route.params.onboarding_token;
const message = ref('');

async function declineInvite() {
  const response = await httpClient.post('/agent/decline', {
    emailAddress: email,
    onboardingTicket: onboardingToken,
  });
  message.value = response.data.message;
}
</script>
