import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './App.vue'
import ProgressBar from 'primevue/progressbar';


const quizeApp = createApp(App);
const piniaStore = createPinia();

quizeApp.component('ProgressBar', ProgressBar);
quizeApp.use(piniaStore).use(PrimeVue).mount('#app');