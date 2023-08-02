// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components for each route
import LoginForm from '../views/LoginForm.vue';
import SignupForm from '../views/SignupForm.vue';
import OnboardingForm from '../views/OnboardingForm.vue';
import ControlPlane from '../views/ControlPlane.vue';

// Define your routes
const routes = [
  { name: 'Login', path: '/', component: LoginForm },
  { name: 'Signup', path: '/signup', component: SignupForm },
  { name: 'Onboard', path: '/onboard/:onboarding_token/:email', component: OnboardingForm },
  { name: 'ControlPlane', path: '/control-plane', component: ControlPlane },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use "history" mode for clean URLs (optional, requires server-side configuration)
  routes,
});

export default router;