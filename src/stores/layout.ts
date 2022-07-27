import { ThemeMode, Modal, FormState } from "@/model";
import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
  id: "layout",
  state: () => ({
    themeMode: ThemeMode.LIGHT,
    currentModal: Modal.NO_MODAL,
    boardFormState: FormState.CREATION,
    taskFormState: FormState.CREATION,
  }),
  getters: {
    getThemeMode: ({ themeMode }) => themeMode,
    getCurrentModal: ({ currentModal }) => currentModal,
    getBoardFormState: ({ boardFormState }) => boardFormState,
    getTaskFormState: ({ taskFormState }) => taskFormState,
  },
  actions: {
    toggle() {
      this.themeMode =
        this.themeMode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    },
    setCurrentModal(modal: Modal) {
      this.currentModal = modal;
    },
    setBoardFormState(state: FormState) {
      this.boardFormState = state;
    },
    setTaskFormState(state: FormState) {
      this.taskFormState = state;
    },
  },
});
