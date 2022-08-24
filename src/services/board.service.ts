import type { Board, Column, Subtask, Task } from "@/model";
import { useBoardStore } from "@/stores/board";
import {
  child,
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
  set,
} from "firebase/database";
const postBoards = async (userId: string, boards: Board[]) => {
  const db = getDatabase();
  let result = { ok: false, serverMessage: "", errorMessage: "" };
  return set(ref(db, "users/" + userId), {
    boards: boards,
  })
    .then((data: any) => {
      result = {
        ...result,
        ok: true,
        serverMessage: "Post Registered !",
      };
      return result;
    })
    .catch((error) => {
      result = {
        ...result,
        ok: false,
        errorMessage: "An error occured !",
      };
      return result;
    });
};

const getBoards = (userId: string) => {
  const db = getDatabase();
  const dbRef = ref(db, `users/${userId}`);

  return onValue(
    dbRef,
    (snapshot) => {
      const { boards } = snapshot.val();
      return formatBoardsData(boards)
    },
    {
      onlyOnce: true,
    }
  );
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
  postBoards,
  getBoards,
};
