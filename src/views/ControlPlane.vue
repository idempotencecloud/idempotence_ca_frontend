<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div class="flex h-16 shrink-0 items-center">
                  <img src="/logo.svg" alt="Idempotence Logo" width="52" height="39" />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            :href="item.href"
                            :class="[
                              item.current
                                ? 'bg-gray-50 text-indigo-600'
                                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                            @click.prevent="handleNavigationClick(item)"
                          >
                            <component
                              :is="item.icon"
                              :class="[
                                item.current
                                  ? 'text-indigo-600'
                                  : 'text-gray-400 group-hover:text-indigo-600',
                                'h-6 w-6 shrink-0',
                              ]"
                              aria-hidden="true"
                            />
                            {{ item.name }}
                          </a>
                        </li>
                        <li>
                          <a
                            :class="[
                              'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                            ]"
                            @click.prevent="logoutAgent"
                          >
                            <ArrowLeftOnRectangleIcon class="h-6 w-6 shrink-0 text-gray-400" />
                            Logout</a
                          >
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6"
      >
        <div class="flex h-16 shrink-0 items-center">
          <img src="/logo.svg" alt="Idempotence Logo" width="52" height="39" />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <a
                    v-if="item.display"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-50 text-indigo-600'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
                    ]"
                    @click.prevent="handleNavigationClick(item)"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        item.current
                          ? 'text-indigo-600'
                          : 'text-gray-400 group-hover:text-indigo-600',
                        'h-6 w-6 shrink-0',
                      ]"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
            <li class="-mx-6 mt-auto">
              <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
              >
                <UserIcon class="h-8 w-8 rounded-full bg-gray-50" />
                <span class="sr-only">Your profile and logout</span>
                <span @click.prevent="logoutAgent" v-if="agentProfile" aria-hidden="true"
                  >{{ agentProfile.firstName }} {{ agentProfile.lastName }}
                  <ArrowLeftOnRectangleIcon class="h-6 w-6 inline-block"
                /></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div
      class="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden"
    >
      <button
        type="button"
        class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        @click="sidebarOpen = true"
      >
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
      <div class="flex-1 text-sm font-semibold leading-6 text-gray-900">Dashboard</div>
      <a href="#">
        <span class="sr-only">Your profile</span>
        <UserIcon class="h-8 w-8 rounded-full bg-gray-50" />
      </a>
    </div>

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8 touch-scroll" ref="scrollPane">
        <div v-if="requestError" class="rounded-md bg-red-50 p-4 mb-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <XCircleIcon class="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                We failed to load your profile, please try again later.
              </h3>
            </div>
          </div>
        </div>
        <router-view @modal-status-change="handleModalStatusChange"></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import httpClient from '@/http-service';
import { ref } from 'vue';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import {
  Bars3Icon,
  LinkIcon,
  BookOpenIcon,
  UsersIcon,
  XMarkIcon,
  UserIcon,
  DocumentMagnifyingGlassIcon,
  KeyIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/vue/24/outline';

import { XCircleIcon } from '@heroicons/vue/24/outline';

import router from '@/router';
import { useStore } from 'vuex';

const requestError = ref(false);

const store = useStore();
async function loadAgent() {
  requestError.value = false;
  try {
    const response = await httpClient.get('/agent');
    store.commit('setAgent', response.data);
    return response.data;
  } catch (error) {
    if (error.code == 'ERR_NETWORK') {
      requestError.value = true;
      return;
    }
    if (error.code == 'ERR_BAD_REQUEST') {
      requestError.value = true;
      return;
    }
    throw error;
  }
}
const agentProfile = ref({});
// import { createRouter, createWebHistory } from 'vue-router';

// import { useRoute } from 'vue-router';

// const route = useRoute();
//console.log(router.currentRoute.value);

const navigation = ref([
  {
    name: 'ControlPlane',
    href: '#',
    path: '/control-plane',
    icon: BookOpenIcon,
    current: false,
    display: true,
  },
  {
    name: 'Connections',
    href: '#',
    path: '/control-plane/connections',
    icon: LinkIcon,
    current: false,
    display: true,
  },
  {
    name: 'Organization',
    href: '#',
    path: '/control-plane/organization',
    icon: UsersIcon,
    current: false,
    display: false,
  },
  {
    name: 'Certificates',
    href: '#',
    path: '/control-plane/certificates',
    icon: DocumentMagnifyingGlassIcon,
    current: false,
    display: true,
  },
  {
    name: 'API Credentials',
    href: '#',
    path: '/control-plane/api-credentials',
    icon: KeyIcon,
    current: false,
    display: true,
  },
]);

loadAgent()
  .then((a) => {
    agentProfile.value = a.agent;
    navigation.value[2].display = agentProfile.value.isAdministrator;
  })
  .catch((e) => {
    console.log(e);
  });

navigation.value.forEach((item) => {
  if (item.path == '/control-plane') {
    item.current = router.currentRoute.value.fullPath == item.path;
  } else {
    item.current = router.currentRoute.value.fullPath.includes(item.path);
  }
});

router.beforeEach((to, from, next) => {
  navigation.value.forEach((item) => {
    if (item.path == '/control-plane') {
      item.current = to.fullPath == item.path;
    } else {
      item.current = to.fullPath.includes(item.path);
    }
  });
  next();
});

const sidebarOpen = ref(false);

const handleNavigationClick = (clickedItem) => {
  navigation.value.forEach((item) => {
    const current = item.path === clickedItem.path;
    if (current) {
      router.push(item.path);
    }
  });
  sidebarOpen.value = false;
};

const logoutAgent = () => {
  localStorage.setItem('token', '');
  window.location = '/';
};

const scrollPane = ref();

const handleModalStatusChange = (data) => {
  if (data) {
    if (window.screen.width < 1024) scrollPane.value.classList.add('scroll-float');
  } else {
    scrollPane.value.classList.remove('scroll-float');
  }
};
</script>

<style>
.touch-scroll {
  overflow: hidden;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.scroll-float {
  float: left;
}
</style>
