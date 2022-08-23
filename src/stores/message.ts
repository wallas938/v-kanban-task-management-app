import { defineStore } from "pinia";

export const useInfoStore = defineStore({
  id: "info",
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
      console.log(errorMessage);
      this.errorMessage = errorMessage;

      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    },
  },
});
