// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Import your Vue components for each route
import LoginForm from '../views/LoginForm.vue';
import SignupForm from '../views/SignupForm.vue';
import OnboardingForm from '../views/OnboardingForm.vue';

// Define your routes
const routes = [
  { path: '/', component: LoginForm },
  { path: '/signup', component: SignupForm },
  { path: '/onboard/:onboarding_token/:email', component: OnboardingForm },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(), // Use "history" mode for clean URLs (optional, requires server-side configuration)
  routes,
});

export default router;