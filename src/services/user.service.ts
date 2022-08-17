import { useLayoutStore } from "./../stores/layout";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const registerStandard = async (email: string, password: string) => {
  const auth = getAuth();
  let result = { data: null };
  return createUserWithEmailAndPassword(auth, email, password)
    .then((data) => {
      return {
        ...result,
        data: data,
      };
    })
    .catch((error) => {
      return result;
    });
};

const signinStandard = async (email: string, password: string) => {
  const auth = getAuth();
  let result = { data: null };
  return signInWithEmailAndPassword(auth, email, password)
    .then((data) => {
      return {
        ...result,
        data: data,
      };
    })
    .catch((error) => {
      return result;
      /* handleSigninError(error); */
    });
};

const oAuthLogin = async () => {
  let result = { data: null };
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider)
    .then((data) => {
      return {
        ...result,
        data: data,
      };
    })
    .catch((error) => {
      return result;
    });
};

function handleSigninError(error: any) {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email or password was incorrect";
    case "auth/user-not-found":
      return "No account with that email was found";
    case "auth/wrong-password":
      return "Invalid email or password was incorrect";
    default:
      return "Invalid email or password was incorrect";
  }
}

export default {
  registerStandard,
  signinStandard,
  oAuthLogin,
};
