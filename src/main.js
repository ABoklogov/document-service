import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import ToastService from 'primevue/toastservice'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import SelectButton from 'primevue/selectbutton';
import VirtualScroller from 'primevue/virtualscroller'

import App from './App.vue'
import router from './router'

import 'primevue/resources/themes/saga-green/theme.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(ToastService);

app.component('Button', Button)
app.component('Toast', Toast)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Spiner', ProgressSpinner)
app.component('Paginator', Paginator)
app.component('SelectButton', SelectButton)
app.component('VirtualScroller', VirtualScroller)
app.mount('#app')
