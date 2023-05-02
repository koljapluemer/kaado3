import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import { createPinia } from 'pinia' // Import
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");
