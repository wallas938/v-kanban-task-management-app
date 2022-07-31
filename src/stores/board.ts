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
              {
                id: "74bedd40-cd50-4b87-b219-b09763eb9538",
                title: "aaa",
                description: "aaaa",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "7ce2e4aa-0399-48c1-a195-26adc7ac5550",
                    title: "aaa",
                    isCompleted: false,
                  },
                  {
                    id: "6b767d3d-4b94-4ace-9212-0cc4aa73d007",
                    title: "aaa",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "3be507d1-460e-40f0-bfac-7dd1d703ef78",
                title: "bbb",
                description: "bbb",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "1a318de0-0f5e-4811-ba68-552c160b139b",
                    title: "bbb",
                    isCompleted: false,
                  },
                  {
                    id: "2370d843-7d29-4f93-b07a-7b75e5dd34f0",
                    title: "bbb",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "f4d0aa08-60a1-4588-b783-f678771687d2",
                title: "ccc",
                description: "ccc",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "ba159a10-bd4a-43be-ad3a-1a9aae650f8c",
                    title: "ccc",
                    isCompleted: false,
                  },
                  {
                    id: "2092cc26-f7b5-40b0-a0f0-3ead1078723e",
                    title: "ccc",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "bef7adc2-5d8d-4c31-aa3f-bca769c6e440",
                title: "ddd",
                description: "ddd",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "3ca6022f-9cdb-41b5-a92d-ef696fd8c7f3",
                    title: "ddd",
                    isCompleted: false,
                  },
                  {
                    id: "08d8052e-95e1-4446-b050-d55db4debb07",
                    title: "ddd",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "a4f626d9-687e-442d-af0a-e9e70bac025e",
                title: "eee",
                description: "eee",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "94ce0051-e8b2-4999-af2c-3831bc7820d6",
                    title: "eee",
                    isCompleted: false,
                  },
                  {
                    id: "e7f80182-b215-4cc9-a98c-982163209887",
                    title: "eee",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "9c78f27e-d368-49c2-8a10-23648a752433",
                title: "fff",
                description: "fff",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "5125950f-548c-4d4c-86e7-f528f124c8c5",
                    title: "fff",
                    isCompleted: false,
                  },
                  {
                    id: "4d036b82-cc12-4779-a78b-49d2f3ae6044",
                    title: "fff",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "6414261f-82aa-40d8-89c8-3d0c6e7dcd47",
                title: "ggg",
                description: "ggg",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "77b88921-181e-4857-ba66-12376c10292f",
                    title: "ggg",
                    isCompleted: false,
                  },
                  {
                    id: "82d52b32-a57a-4ed2-8942-5523000a3e29",
                    title: "ggg",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "5c0eb6e2-2a68-4f12-a746-19fd7f18f864",
                title: "hhh",
                description: "hhh",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "05fda8f7-b3ab-4cd6-90e4-a3e9f232df56",
                    title: "hhh",
                    isCompleted: false,
                  },
                  {
                    id: "2b7cf545-8308-400a-9622-56cf994540d2",
                    title: "hhh",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "a0156732-dd58-4a9e-ad2e-fbed2f8103f0",
                title: "iii",
                description: "iii",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "ede951c2-0502-4e83-b1d5-ca9fa63f19af",
                    title: "iii",
                    isCompleted: false,
                  },
                  {
                    id: "e219f94c-5b4f-42a0-94c3-8589857a9026",
                    title: "iii",
                    isCompleted: false,
                  },
                ],
                status: "",
              },
              {
                id: "928ac240-7178-4053-b3ca-84d96ce781ab",
                title: "jjj",
                description: "jjj",
                columnId: "e1b92d6f-638b-4a6f-8c7b-5f0acd28bc4f",
                subtasks: [
                  {
                    id: "2cfbafd9-cd06-49e9-9cad-780a8e329c35",
                    title: "jjj",
                    isCompleted: false,
                  },
                  {
                    id: "5d4a761c-14ba-4dff-90e0-cab8df035ad1",
                    title: "jjj",
                    isCompleted: false,
                  },
                ],
                status: "",
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
