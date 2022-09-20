import type { Board, Column, Subtask, Task } from "@/model";

interface AccessData {
  accessToken: string;
  refreshToken: string;
}
const postBoard = async (
  board: Board,
  access_data: AccessData
): Promise<any> => {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": access_data.accessToken,
      "rf_t": access_data.refreshToken,
    },
    body: JSON.stringify({ board }),
  };

  return await fetch(`${import.meta.env.VITE_DEV_API_URI}/boards`, init)
    .then((res: any) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        errorMessage: "An error occured",
        ok: false,
        error: err
      }
    });
};

const updateBoard = async (board: Board,
  access_data: AccessData): Promise<any> => {
    const init: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": access_data.accessToken,
        "rf_t": access_data.refreshToken,
      },
      body: JSON.stringify({ board }),
    };
    return await fetch(`${import.meta.env.VITE_DEV_API_URI}/boards/${board._id}`, init)
    .then((res: any) => res.json())
    .then((data) => {
      return {
        ok: data.ok,
        serverMessage: data.message,
        board: data.board
      };
    })
    .catch((err) => {
      return {
        errorMessage: "An error occured",
        ok: false,
        error: err
      }
    });
};
const deleteBoard = async (boardId: string,
  access_data: AccessData): Promise<any> => {
    const init: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": access_data.accessToken,
        "rf_t": access_data.refreshToken,
      },
    };
    return await fetch(`${import.meta.env.VITE_DEV_API_URI}/boards/${boardId}`, init)
    .then((res: any) => res.json())
    .then((data) => {
      return {
        ok: data.ok,
        serverMessage: data.message,
        board: data.board
      };
    })
    .catch((err) => {
      return {
        errorMessage: "An error occured",
        ok: false,
        error: err
      }
    });
};

const getBoards = async (userId: String,
  access_data: AccessData): Promise<any> => {
  const init: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": access_data.accessToken,
      "rf_t": access_data.refreshToken,
    },
  };

  return await fetch(`${import.meta.env.VITE_DEV_API_URI}/boards?userId=${userId}`, init)
    .then((res: any) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return {
        errorMessage: "An error occured",
        ok: false,
        error: err
      }
    });
};

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
  postBoard,
  getBoards,
  updateBoard,
  deleteBoard
};
