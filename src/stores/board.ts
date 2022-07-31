import { ThemeMode, Modal } from "@/model";
import type { Board, Task, Column } from "@/model";
import { defineStore } from "pinia";

export const useBoardStore = defineStore({
  id: "board",
  state: () => ({
    boards: [
      {
        name: "My New Board",
        columns: [
          {
            id: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
            name: "Col 1",
            color: "#b9fbc0ff",
            tasks: [
              {
                id: "4ed73b55-4df1-40cd-ba90-d4a272ee4ae1",
                title: "Task 1",
                description: "aaa",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "69e90168-ebf5-408b-916d-cfceb3253506",
                    title: "subtask 1",
                    isCompleted: false,
                  },
                  {
                    id: "77d0bc76-0f43-4ea6-a9e8-38b1091d6efd",
                    title: "subtask 2",
                    isCompleted: false,
                  },
                ],
                status: "Col 1",
              },
            ],
          },
          {
            id: "fc30196c-2b69-472d-86d4-23b4b42d764c",
            name: "Col 2",
            color: "#f72585ff",
            tasks: [
              {
                id: "834ed978-e393-4135-9d52-c88037465410",
                title: "Task 2",
                description: "bbb",
                columnId: "fc30196c-2b69-472d-86d4-23b4b42d764c",
                subtasks: [
                  {
                    id: "2ffacbce-8ac9-4da2-b540-4cdc84357755",
                    title: "subtask 1 ",
                    isCompleted: false,
                  },
                  {
                    id: "b03d57d2-387b-48c8-90be-84e9caeb82a4",
                    title: "subtask 2",
                    isCompleted: false,
                  },
                  {
                    id: "aa1a13b4-ab3a-47bd-ae8b-0351ae61ccc1",
                    title: "subtask 3",
                    isCompleted: false,
                  },
                ],
                status: "Col 2",
              },
            ],
          },
          {
            id: "fa3b330b-7189-4b46-9d9c-0afd151b29c1",
            name: "Col 3",
            color: null,
            tasks: [],
          },
        ],
      },
    ] as Board[],
    currentBoardIndex: 0,
    currentColumnIndex: 0,
    currentTaskIndex: 0,
    currentTask: {} as Task | undefined,
  }),
  getters: {
    getBoards: (state) => state.boards,
    getCurrentBoard: (state) => state.boards[state.currentBoardIndex],
    getTaskBoard: (state) => state,
    getCurrentBoardIndex: (state) => state.currentBoardIndex,
    getCurrentColumnIndex: (state) => state.currentColumnIndex,
    getCurrentTaskIndex: (state) => state.currentTaskIndex,
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
    setCurrentTask(columnIndex: number, taskIndex: number) {
      this.currentTask =
        this.boards[this.currentBoardIndex].columns[columnIndex].tasks[
          taskIndex
        ];

      this.currentColumnIndex = columnIndex;
      this.currentTaskIndex = taskIndex;
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
    updateCurrentTask(updatedTask: Task, columnIndex: number) {
      /* STAY IN THE SAME COLUMN */
      if (columnIndex === this.currentColumnIndex) {
        this.boards[this.currentBoardIndex].columns[columnIndex].tasks = [
          ...this.boards,
        ][this.currentBoardIndex].columns[columnIndex].tasks.map(
          (task: Task) => {
            console.log(task.id === this.currentTask?.id);
            if (task.id === this.currentTask?.id) {
              return updatedTask;
            }
            return task;
          }
        );
        return;
      }
      /* COLUMN CHANGING */

      /* REMOVED FROM THE PREVIOUS ONE */
      this.boards[this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks = [
        ...this.boards[this.currentBoardIndex].columns[
          this.currentColumnIndex
        ].tasks.filter((task) => task.id !== updatedTask.id),
      ];

      /* APPENDED TO THE NEW ONE */
      this.boards[this.currentBoardIndex].columns[columnIndex].tasks = [
        ...this.boards[this.currentBoardIndex].columns[columnIndex].tasks,
        updatedTask,
      ];
    },
    checkSubtask(subtaskIndex: number) {
      this.boards[this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks[this.currentTaskIndex].subtasks[subtaskIndex].isCompleted =
        !this.boards[this.currentBoardIndex].columns[this.currentColumnIndex]
          .tasks[this.currentTaskIndex].subtasks[subtaskIndex].isCompleted;
    },
    changeTaskStatus(columnIndex: number, columnName: string) {
      /* ColumnId changing */
      this.boards[this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks[this.currentTaskIndex].columnId =
        this.boards[this.currentBoardIndex].columns[this.currentColumnIndex].id;

      /* Column Name changing */
      this.boards[this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks[this.currentTaskIndex].status = columnName;

      /* REMOVED FROM THE PREVIOUS ONE */
      this.boards[this.currentBoardIndex].columns[
        this.currentColumnIndex
      ].tasks = [
        ...this.boards[this.currentBoardIndex].columns[
          this.currentColumnIndex
        ].tasks.filter((task) => task.id !== this.currentTask?.id),
      ];

      /* APPENDED TO THE NEW ONE */
      if (this.currentTask) {
        this.boards[this.currentBoardIndex].columns[columnIndex].tasks = [
          ...this.boards[this.currentBoardIndex].columns[columnIndex].tasks,
          this.currentTask,
        ];
      }

      /* UPDATED TASK INDEX */
      const currentTaskIndex =
        [...this.boards[this.currentBoardIndex].columns[columnIndex].tasks]
          .length - 1;

      /* UPDATED TASK */
      this.currentTask =
        this.boards[this.currentBoardIndex].columns[columnIndex].tasks[
          currentTaskIndex
        ];

      this.currentColumnIndex = columnIndex;

      this.currentTaskIndex = currentTaskIndex;
    },
  },
});
