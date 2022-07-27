import { ThemeMode, Modal } from "@/model";
import type { Board } from "@/model";
import { defineStore } from "pinia";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: [
      {
        name: "a",
        columns: [
          {
            name: "b",
            color: "#cfbaf0ff",
            tasks: [],
          },
          {
            name: "c",
            color: "#f72585ff",
            tasks: [],
          },
        ],
      },
    ] as Board[],
    currentBoardIndex: 0 as number | null,
  }),
  getters: {
    getBoards: (state) => state.boards,
    getCurrentBoard: (state) =>
      state.currentBoardIndex !== null && state.boards[state.currentBoardIndex],
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
      this.currentBoardIndex =
        this.boards.length - 1 < 0 ? null : this.boards.length - 1;
    },
    updateCurrentBoard(updatedBoard: Board) {
      this.boards = [...this.boards].map((board: Board, idx: number) => {
        if (idx === this.currentBoardIndex) {
          return updatedBoard;
        }
        return board;
      });
      console.log(this.boards);
    },
  },
});
