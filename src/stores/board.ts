import { ThemeMode, Modal } from "@/model";
import type { Board, Task, Column } from "@/model";
import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: [] as Board[],
    currentBoardIndex: 0,
    currentColumnIndex: 0,
    currentTask: {} as Task | undefined,
  }),
  getters: {
    getBoards: (state) => state.boards,
    getCurrentBoard: (state) => state.boards[state.currentBoardIndex],
    getTaskBoard: (state) => state,
    getCurrentBoardIndex: (state) => state.currentBoardIndex,
    getCurrentColumnIndex: (state) => state.currentColumnIndex,
    getCurrentTask: (state) => state.currentTask,
  },
  actions: {
    addNewBoard(board: Board) {
      this.boards = [...this.boards, board];
      this.currentBoardIndex = this.boards.length - 1;
    },
    addNewTask(task: Task, columnIndex: number) {
      this.boards[this.currentBoardIndex].columns[columnIndex].tasks = [
        ...this.boards[this.currentBoardIndex].columns[columnIndex].tasks,
        task,
      ];
    },
    setCurrentBoard(index: number) {
      this.currentBoardIndex = index;
    },
    setCurrentTask(columnIndex: number, taskId: string) {
      this.currentTask = this.boards[this.currentBoardIndex].columns[
        columnIndex
      ].tasks.find((task: Task) => task.id === taskId);

      this.currentColumnIndex = columnIndex;
    },
    deleteCurrentBoard(index: number) {
      this.boards = [...this.boards].filter(
        (board: Board, idx: number) => idx !== index
      );
      this.currentBoardIndex =
        this.boards.length - 1 < 0 ? 0 : this.boards.length - 1;
    },
    deleteCurrentTask() {
      this.boards[this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks = [...this.boards][this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks.filter(
        (task: Task, idx: number) => task.id !== this.currentTask?.id
      );

      this.currentTask = {} as Task;
    },
    updateCurrentBoard(updatedBoard: Board) {
      this.boards = [...this.boards].map((board: Board, idx: number) => {
        if (idx === this.currentBoardIndex) {
          return updatedBoard;
        }
        return board;
      });
    },
  },
});
