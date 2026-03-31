import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { iocraft } from "iocraft";
import ui from "@nuxt/ui/vue-plugin";

const app = createApp(App);

app.use(router);
app.use(iocraft, {
  router,
});
app.use(ui);
app.mount("#app");
