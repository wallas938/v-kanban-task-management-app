import { useLayoutStore } from "./../stores/layout";
import type { KtmUser } from "@/model";

import { useAuthStore } from "@/stores/auth";

const registerStandard = async (
  email: string,
  password: string
): Promise<any> => {
  const init: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  return await fetch(`${import.meta.env.VITE_DEV_API_URI}/users/signup`, init)
    .then((res: Response) => {
      return res.json();
    })
    .then((payload) => {
      if (!payload.ok) {
        return {
          serverMessage: payload.message,
        };
      }

      storeAccessTokenIntoLocalStorage(payload.access_token);
      storeRefreshTokenIntoLocalStorage(payload.refresh_token);
      let user = {
        accessToken: payload.access_token,
        refreshToken: payload.refresh_token,
        email: payload.email ? payload.email : "",
        _id: payload._id,
      };

      return {
        ok: true,
        user,
        serverMessage: "Your are registered and connected !",
      };
    })
    .catch((err) => {
      return {
        serverMessage: "An error occured",
        error: err,
      };
    });

  /* const auth = getAuth();
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
    }); */
};

const signinStandard = async (email: string, password: string) => {
  console.log(email);

  /* const auth = getAuth();
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
    }); */
};

/*const oAuthLogin = async () => {
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
}; */

/* function handleSigninError(error: any) {
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
} */

function storeAccessTokenIntoLocalStorage(accTok: string) {
  localStorage.setItem("access_token", JSON.stringify(accTok));
}

function storeRefreshTokenIntoLocalStorage(rfrs_tok: string) {
  localStorage.setItem("refresh_token", JSON.stringify(rfrs_tok));
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
  getUserFromLocalStorage,
};
