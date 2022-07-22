import { ThemeMode, Modal } from "@/model";
import type { Board } from "@/model";
import { defineStore } from "pinia";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: [] as Board[],
    currentBoard: {} as Board,
  }),
  getters: {
    getBoards: ({ boards }) => boards,
    getCurrentBoard: ({ currentBoard }) => currentBoard,
  },
  actions: {
    addNewBoard(board: Board) {
      this.boards = [...this.boards, board];
    },
  },
});
