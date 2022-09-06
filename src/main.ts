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
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import KTMLoadingSnackbar from "./components/layout/KTMLoadingSnackbar.vue";
import KTMLoadingEllipsis from "./components/layout/KTMLoadingEllipsis.vue";


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.component("ktm-dropdown", KTMDropdown);
app.component("ktm-modal", KTMModal);
app.component("ktm-loading-snackbar", KTMLoadingSnackbar);
app.component("ktm-loading-ellipsis", KTMLoadingEllipsis);

app.mount("#app");
