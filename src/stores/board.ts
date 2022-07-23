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
    getBoards: ({ boards }) => boards,
    getCurrentBoard: ({ currentBoardIndex, boards }) =>
      boards[currentBoardIndex],
    getCurrentBoardIndex: ({ currentBoardIndex }) => currentBoardIndex,
  },
  actions: {
    addNewBoard(board: Board) {
      this.boards = [...this.boards, board];
      this.currentBoardIndex = this.boards.length - 1;
    },
    setCurrentBoard(index: number) {
      this.currentBoardIndex = index;
    },
  },
});
