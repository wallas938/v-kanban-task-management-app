import { ThemeMode, Modal, FormState } from "@/model";
import type { KtmUser } from "@/model";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null as KtmUser | null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user: KtmUser) {
      this.user = user;

      console.log(this.user);
    },
  },
});
