<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div v-if="loginError" class="rounded-md bg-red-50 p-4 mb-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">
            The login credentials you provided were invalid. Please check you email and password try
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
    <img src="/logo-large.svg" alt="Idempotence Logo" id="logo-svg" />
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Idempotence&#x2120; CA, Certificate Management Simplified, Humanizing mTLS.
    </h2>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account.
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST" @submit.prevent="handleSignin">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              ref="email"
              id="email-address"
              name="email-address"
              type="email"
              autocomplete="email"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
            <!--<div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>-->
          </div>
          <div class="mt-2">
            <input
              ref="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            ref="loginButton"
            id="form-submit"
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        <span
          class="cursor-pointer inline-flex m-1 items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:text-yellow-500 active:text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
          @click.prevent="loginDemoAgent('summerrutherford@nikolaus.name')"
          >Demo Agent #1 (Admin) Login <UserGroupIcon class="h-4 w-4 ml-1"
        /></span>
        <span
          class="cursor-pointer inline-flex m-1 items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:text-yellow-500 active:text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
          @click.prevent="loginDemoAgent('carissakunze@lindgren.info')"
          >Demo Agent #2 (Admin) Login <UserGroupIcon class="h-4 w-4 ml-1"
        /></span>
        <span
          class="cursor-pointer inline-flex m-1 items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:text-yellow-500 active:text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
          @click.prevent="loginDemoAgent('tonycruickshank@dare.name')"
          >Demo Agent #3 (Non-Admin) Login <UserGroupIcon class="h-4 w-4 ml-1"
        /></span>
        <span
          class="cursor-pointer inline-flex m-1 items-center rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700 hover:text-yellow-500 active:text-yellow-700 ring-1 ring-inset ring-yellow-600/20"
          @click.prevent="loginDemoAgent('stephonkeeling@homenick.biz')"
          >Demo Agent #4 (Admin) Login <UserGroupIcon class="h-4 w-4 ml-1"
        /></span>
      </p>

      <p class="mt-5 text-center text-sm text-gray-500">
        New to Idempotence CA℠?
        {{ ' ' }}
        <a
          href="#"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          @click.prevent="signup"
          >Register a new company</a
        >
      </p>
      <p class="mt-5 text-center text-sm text-gray-500">
        <a
          target="_blank"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="https://www.change.org/p/usps-in-person-identity-proofing-service"
          >USPS IAL 3 Identity Proofing Petition</a
        >
      </p>
      <p class="mt-5 text-center text-sm text-gray-500">
        <a
          target="_blank"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="https://www.youtube.com/watch?v=WOHVIltC9Og"
          >Product Overview</a
        >
      </p>
      <p class="mt-5 text-center text-sm text-gray-500">
        <a
          target="_blank"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="https://api.ca.idempotence.io/api/v1/docs"
          >API Documentation</a
        >
      </p>
      <p class="mt-5 text-center text-sm text-gray-500">
        <a
          target="_blank"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="https://calendly.com/idempotence/initial-contact"
          >Schedule K8s Cluster Deployment</a
        >
      </p>
      <p class="mt-5 text-center text-sm text-gray-500">
        <a
          target="_blank"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="/docs/EULA.pdf"
          >End User License Agreement</a
        >
      </p>
      <p class="mt-5 text-center text-sm text-gray-500">
        <a
          target="_blank"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          href="/docs/PrivacyPolicy.pdf"
          >Privacy Policy</a
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import parseFormElements from '../helpers/formParser';
import httpClient from '../http-service';
import router from '@/router';
import { ref } from 'vue';

import { UserGroupIcon } from '@heroicons/vue/20/solid';
import { XCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const loginError = ref(false);
const networkError = ref(false);
const email = ref();
const password = ref();
const loginButton = ref();

const loginDemoAgent = (loginId) => {
  email.value.value = loginId;
  password.value.value = 'tryme';
  loginButton.value.click();
};

async function handleSignin(e) {
  let submittedInfo = {};
  let submittedElements = {};
  loginError.value = false;
  networkError.value = false;
  parseFormElements(e.target, submittedInfo, submittedElements);
  try {
    submittedElements['form-submit'].disabled = true;
    const response = await httpClient.post('/login', submittedInfo);
    localStorage.setItem('token', response.data.token);
    console.log('POST request successful:', response.data);
    submittedElements['form-submit'].disabled = false;
    router.push(httpClient.pendingRedirect);
    httpClient.pendingRedirect = '/control-plane';
  } catch (error) {
    submittedElements['form-submit'].disabled = false;
    console.log(error);
    if (error.code == 'ERR_NETWORK') {
      console.log('Network error');
      networkError.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      console.error('Authentication error');
      loginError.value = true;
      return;
    }
  }
}

function signup() {
  router.push({ name: 'Signup' });
}
</script>

<style>
#logo-svg {
  margin: 0 auto;
}
</style>
