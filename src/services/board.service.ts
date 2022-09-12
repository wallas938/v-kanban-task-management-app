import type { Board, Column, Subtask, Task } from "@/model";

interface AccessData {
  access_token: string;
  refresh_token: string;
}
const postBoards = async (
  board: Board,
  access_data: AccessData
): Promise<any> => {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": access_data.access_token,
      "rf_t": access_data.refresh_token,
    },
    body: JSON.stringify({ board }),
  };

  return await fetch(`${import.meta.env.VITE_DEV_API_URI}/boards`, init)
    .then((res: any) => res.json())
    .then((data) => {
      return data;
    })
    .then((err) => {
      return {
        errorMessage: "An error occured",
        ok: false,
        error: err
      }
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
