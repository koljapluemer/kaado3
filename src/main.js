import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import { createPinia } from 'pinia' // Import
import { init, usePouchPlugin } from 'pinia-pouchdb-plugin';
const pinia = createPinia().use(() => (
  usePouchPlugin({
    database: init("mydb")
  })
))

createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");
