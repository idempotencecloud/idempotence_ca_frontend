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

// Define your routes
const routes = [
  { name: 'Login', path: '/', component: LoginForm },
  { name: 'Signup', path: '/signup', component: SignupForm },
  { name: 'Onboard', path: '/onboard/:onboarding_token/:email/:mode', component: OnboardingForm },
  {
    name: 'DeclineInvitation',
    path: '/decline-invite/:onboarding_token/:email',
    component: DeclineInvitationForm,
  },
  {
    name: 'ControlPlane',
    path: '/control-plane',
    component: ControlPlane,
    children: [
      { path: '', component: ControlPlaneView }, // Default child route
      { path: 'connections', component: ConnectionsView },
      { path: 'connections/:action', component: ConnectionsView },
      { path: 'organization', component: OrganizationView },
      {
        path: 'certificates',
        component: CertificatesView,
        children: [
          { path: '', component: ActiveConnections },
          { path: ':connection_id', component: ConnectionCertificates },
        ],
      },
      { path: 'api-credentials', component: APICredentials },
    ],
  },
  { name: 'Login', path: '/', component: LoginForm },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use "history" mode for clean URLs (optional, requires server-side configuration)
  routes,
});

export default router;
