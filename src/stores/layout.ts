import { ThemeMode } from "@/model";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
  id: "layout",
  state: () => ({
    themeMode: ThemeMode.LIGHT,
  }),
  getters: {
    getThemeMode: (state) => state.themeMode,
  },
  actions: {
    toggle() {
      this.themeMode =
        this.themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    },
  },
});
