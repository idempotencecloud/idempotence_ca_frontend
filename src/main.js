// src/main.js
import { createApp } from 'vue'; // Import createApp function
import 'tailwindcss/tailwind.css'
import App from './App.vue';
import router from './router'; // Import the router instance

const app = createApp(App); // Create the Vue app instance
app.use(router); // Use the router instance
app.mount('#app'); // Mount the app to the DOM element with id="app"