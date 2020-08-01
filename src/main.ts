import Vue from "vue"
import "./plugins/bootstrap-vue"
import "./plugins/composition"
import App from "./App.vue"
import "./registerServiceWorker"

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount("#app")
