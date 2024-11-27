// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components for each route
import LoginForm from '../views/LoginForm.vue';
import SignupForm from '../views/SignupForm.vue';
import OnboardingForm from '../views/OnboardingForm.vue';
import DeclineInvitationForm from '../views/DeclineInvitationForm.vue';
import ControlPlane from '../views/ControlPlane.vue';
import ControlPlaneView from '../views/control-plane/ControlPlaneView.vue';
import ConnectionsView from '../views/control-plane/ConnectionsView.vue';
import OrganizationView from '../views/control-plane/OrganizationView.vue';
import CertificatesView from '../views/control-plane/CertificatesView.vue';
import ActiveConnections from '../views/control-plane/certificates/ActiveConnections.vue';
import ConnectionCertificates from '../views/control-plane/certificates/ConnectionCertificates.vue';
import APICredentials from '../views/control-plane/APICredentials.vue';
import NotFound from '../views/PathNotFound.vue';

// Define your routes
const routes = [
  {
    name: 'Login',
    path: '/',
    component: LoginForm,
    meta: {
      title: 'Idempotence℠ CA - Sign in',
    },
  },
  {
    name: 'Signup',
    path: '/signup',
    component: SignupForm,
    meta: {
      title: 'Idempotence℠ CA - New Account Signup',
    },
  },
  {
    name: 'Onboard',
    path: '/onboard/:onboarding_token/:email/:mode',
    component: OnboardingForm,
    meta: {
      title: 'Idempotence℠ CA - Onboarding',
    },
  },
  {
    name: 'DeclineInvitation',
    path: '/decline-invite/:onboarding_token/:email',
    component: DeclineInvitationForm,
    meta: {
      title: 'Idempotence℠ CA - Decline Company Invitation',
    },
  },
  {
    name: 'ControlPlane',
    path: '/control-plane',
    component: ControlPlane,
    children: [
      {
        path: '',
        component: ControlPlaneView,
        meta: {
          title: 'Idempotence℠ CA - Welcome',
        },
      }, // Default child route
      {
        path: 'connections',
        component: ConnectionsView,
        meta: {
          title: 'Idempotence℠ CA - Connections',
        },
      },
      {
        path: 'connections/:action',
        component: ConnectionsView,
        meta: {
          title: 'Idempotence℠ CA - Connections',
        },
      },
      {
        path: 'organization',
        component: OrganizationView,
        meta: {
          title: 'Idempotence℠ CA - Organization Management',
        },
      },
      {
        path: 'certificates',
        component: CertificatesView,
        children: [
          {
            path: '',
            component: ActiveConnections,
            meta: {
              title: 'Idempotence℠ CA - Certificates Connections',
            },
          },
          {
            path: ':connection_id/:mode',
            component: ConnectionCertificates,
            meta: {
              title: 'Idempotence℠ CA - Connection Certificates',
            },
          },
        ],
      },
      {
        path: 'api-credentials',
        component: APICredentials,
        meta: {
          title: 'Idempotence℠ CA - API Credentials',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      title: 'Idempotence℠ CA - Area not found',
    },
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use "history" mode for clean URLs (optional, requires server-side configuration)
  routes,
});

router.beforeResolve((to) => {
  document.title = to.meta.title;
});

export default router;
