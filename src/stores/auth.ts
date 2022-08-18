import { ThemeMode, Modal, FormState } from "@/model";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    serverMessage: null as string | null,
    errorMessage: null as string | null,
  }),
  getters: {
    getServerMessage: (state) => state.serverMessage,
    getErrorMessage: (state) => state.errorMessage,
  },
  actions: {
    setServerMessage(serverMessage: string) {
      /* HERE !!!! */
      this.serverMessage = serverMessage;
      setTimeout(() => {
        this.serverMessage = null;
      }, 3000);
    },
    setErrorMessage(errorMessage: string) {
      /* HERE !!!! */
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    },
  },
});
