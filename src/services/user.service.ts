import { useLayoutStore } from "./../stores/layout";
import type { KtmUser } from "@/model";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const registerStandard = async (email: string, password: string) => {
  const auth = getAuth();
  let result = {
    user: null as null | KtmUser,
    serverMessage: null as null | string,
    errorCode: null as null | string,
  };
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      return {
        ...result,
        user: {
          accessToken: await data.user.getIdToken(),
          refreshToken: data.user.refreshToken,
          email: data.user.email,
          metadata: data.user.metadata,
          uid: data.user.uid,
        },
        serverMessage: "Your are registered and connected !",
      };
    })
    .catch((error) => {
      return {
        ...result,
        errorCode: handleSigninError(error),
      };
    });
};

const signinStandard = async (email: string, password: string) => {
  const auth = getAuth();
  let result = { user: null, serverMessage: null, errorCode: null };
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      return {
        ...result,
        user: {
          accessToken: await data.user.getIdToken(),
          refreshToken: data.user.refreshToken,
          email: data.user.email,
          metadata: data.user.metadata,
          uid: data.user.uid,
        },
        serverMessage: "Your are connected !",
      };
    })
    .catch((error) => {
      return {
        ...result,
        errorCode: handleSigninError(error),
      };
    });
};

const oAuthLogin = async () => {
  let result = { user: null, serverMessage: null, errorCode: null };
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider)
    .then(async (data) => {
      return {
        ...result,
        user: {
          accessToken: await data.user.getIdToken(),
          refreshToken: data.user.refreshToken,
          email: data.user.email,
          metadata: data.user.metadata,
          uid: data.user.uid,
        },
      };
    })
    .catch((error) => {
      return {
        ...result,
        errorCode: handleSigninError(error),
      };
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
