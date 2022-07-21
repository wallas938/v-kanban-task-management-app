import { ThemeMode, Modal } from "@/model";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
  id: "layout",
  state: () => ({
    themeMode: ThemeMode.LIGHT,
    currentModal: "",
  }),
  getters: {
    getThemeMode: (state) => state.themeMode,
  },
  actions: {
    toggle() {
      this.themeMode =
        this.themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    },
    setCurrentModal(modal: Modal) {
      this.currentModal = modal;
    },
  },
});
