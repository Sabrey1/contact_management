import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import router from "./router";

const app = createApp(App)

// app.use(PrimeVue);


app.component('DataTable', DataTable);
app.component('Column', Column);

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});

app.use(router)
app.mount('#app')
