import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* Global Styles */
import "./sass/_reset.scss";
import "./sass/_global.scss";

/* Base Components */
import KTMDropdown from "./components/layout/KTMDropdown.vue";
import KTMModal from "./components/layout/KTMModal.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("ktm-dropdown", KTMDropdown);
app.component("ktm-modal", KTMModal);

app.mount("#app");
