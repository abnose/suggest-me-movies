import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'



import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';

const app = createApp(App)
app.use(PrimeVue);

app.use(createPinia())
app.use(router)

import 'primevue/resources/themes/lara-dark-indigo/theme.css'
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
app.component('Button', Button);

import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import InputGroupAddon from 'primevue/inputgroupaddon';
import MultiSelect from 'primevue/multiselect';

app.component('MultiSelect', MultiSelect);
app.component('InputGroup', InputGroup);
app.component('InputText', InputText);
app.component('InputGroupAddon', InputGroupAddon);


app.mount('#app')


