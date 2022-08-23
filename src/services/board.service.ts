import type { Board } from "@/model";
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

  onValue(dbRef, (snapshot: DataSnapshot) => {
    const data = snapshot.val();
    console.log(data);
  });
};

export default {
  postBoards,
  getBoards,
};
