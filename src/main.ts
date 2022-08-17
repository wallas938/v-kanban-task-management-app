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
import KTMLoadingSnackbar from "./components/layout/KTMLoadingSnackbar.vue";
import KTMLoadingEllipsis from "./components/layout/KTMLoadingEllipsis.vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASURMENT_ID,
};

initializeApp(firebaseConfig);
export const pinia = createPinia();
export const app = createApp(App);

app.use(pinia);
app.use(router);

app.component("ktm-dropdown", KTMDropdown);
app.component("ktm-modal", KTMModal);
app.component("ktm-loading-snackbar", KTMLoadingSnackbar);
app.component("ktm-loading-ellipsis", KTMLoadingEllipsis);

app.mount("#app");
