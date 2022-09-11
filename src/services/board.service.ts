import type { Board, Column, Subtask, Task } from "@/model";
import { useBoardStore } from "@/stores/board";
const postBoards = async (userId: string, board: Board): Promise<any> => {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ board }),
  };

  return await fetch(`${import.meta.env.VITE_DEV_API_URI}/boards`, init)
    .then((res: any) => res.json())
    .then((data) => {
      return data;
    });
};
const getBoards = (userId: string) => {};

const formatBoardsData = (boards: Board[]) => {
  return boards.map((b: Board) => {
    return {
      ...b,
      columns: b.columns.map((c: Column) => {
        return {
          ...c,
          tasks: c.tasks
            ? c.tasks.map((t: Task) => {
                return {
                  ...t,
                  subtasks: t.subtasks ? t.subtasks : [],
                };
              })
            : [],
        };
      }),
    };
  });
};

export default {
  postBoards,
  getBoards,
};
