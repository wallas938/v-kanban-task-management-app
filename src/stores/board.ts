import { ThemeMode, Modal } from "@/model";
import type { Board } from "@/model";
import { defineStore } from "pinia";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: [] as Board[],
    currentBoardIndex: 0,
  }),
  getters: {
    getBoards: (state) => state.boards,
    getCurrentBoard: (state) => state.boards[state.currentBoardIndex],
    getCurrentBoardIndex: (state) => state.currentBoardIndex,
  },
  actions: {
    addNewBoard(board: Board) {
      this.boards = [...this.boards, board];
      this.currentBoardIndex = this.boards.length - 1;
    },
    setCurrentBoard(index: number) {
      this.currentBoardIndex = index;
    },
    deleteCurrentBoard(index: number) {
      this.boards = [...this.boards].filter(
        (board: Board, idx: number) => idx !== index
      );
      this.currentBoardIndex = this.boards.length - 1;
    },
  },
});
