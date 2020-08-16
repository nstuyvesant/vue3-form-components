import "@/plugins/bootstrap-vue" // Before createApp
import { createApp } from "vue"
import App from "@/App.vue"
import "@/registerServiceWorker" // After App

createApp(App).mount("#app")
