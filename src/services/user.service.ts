import { useLayoutStore } from "./../stores/layout";
import type { KtmUser, UserMetaData } from "@/model";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useAuthStore } from "@/stores/auth";

const registerStandard = async (email: string, password: string) => {
  const auth = getAuth();
  let result = {
    user: null as null | KtmUser,
    serverMessage: null as null | string,
    errorCode: null as null | string,
  };
  let user;
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      user = {
        accessToken: await data.user.getIdToken(),
        refreshToken: data.user.refreshToken,
        email: data.user.email ? data.user.email : "",
        metadata: data.user.metadata,
        uid: data.user.uid,
      };
      storeUserIntoLocalStorage(user);
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
  let user;
  return signInWithEmailAndPassword(auth, email, password)
    .then(async (data) => {
      user = {
        accessToken: await data.user.getIdToken(),
        refreshToken: data.user.refreshToken,
        email: data.user.email ? data.user.email : "",
        metadata: data.user.metadata,
        uid: data.user.uid,
      };
      storeUserIntoLocalStorage(user);
      return {
        ...result,
        user,
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
  let user;
  return signInWithPopup(getAuth(), provider)
    .then(async (data) => {
      user = {
        accessToken: await data.user.getIdToken(),
        refreshToken: data.user.refreshToken,
        email: data.user.email ? data.user.email : "",
        metadata: data.user.metadata,
        uid: data.user.uid,
      };
      storeUserIntoLocalStorage(user);
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

function storeUserIntoLocalStorage(user: any) {
  localStorage.setItem("usr", JSON.stringify(user));
}

function removeUserFromLocalStorage() {
  localStorage.removeItem("usr");
}

function getUserFromLocalStorage(): any {
  let usr = localStorage.getItem("usr");
  if (usr) {
    return JSON.parse(usr);
  }
  return usr;
}

export default {
  registerStandard,
  signinStandard,
  oAuthLogin,
  getUserFromLocalStorage
};
