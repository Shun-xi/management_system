import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import { Icon } from "@iconify/vue";
import navigationMenuView from "@/components/navigationMenuView.vue";
import VueCropper from "vue-cropper";
import "vue-cropper/dist/index.css";
const app = createApp(App);

// 全局注册Iconify的Icon组件
// eslint-disable-next-line vue/multi-word-component-names
app.component("Icon", Icon);
app.component("navigationMenuView", navigationMenuView);
app.use(VueCropper);

app.use(router);
app.mount("#app");
