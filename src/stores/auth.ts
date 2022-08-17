import { ThemeMode, Modal, FormState } from "@/model";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    serverMessage: null as string | null,
  }),
  getters: {
    getServerMessage: (state) => state.serverMessage,
  },
  actions: {
    setServerMessage(serverMessage: string) {
      /* HERE !!!! */
      this.serverMessage = serverMessage;
    },
  },
});
