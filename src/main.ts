import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* Global Styles */
import "./sass/_reset.scss";
import "./sass/_global.scss";
import "./sass/helpers/_class.scss";

/* Base Components */
import KTMDropdown from "./components/layout/KTMDropdown.vue";
import KTMModal from "./components/layout/KTMModal.vue";
const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.component("ktm-dropdown", KTMDropdown);
app.component("ktm-modal", KTMModal);

app.mount("#app");
