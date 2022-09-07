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
      console.log(err);
      return {
        serverMessage: "An error occured",
        error: err,
      };
    });
};

const signinStandard = async (
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
  return await fetch(`${import.meta.env.VITE_DEV_API_URI}/users/signin`, init)
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
        serverMessage: "Your are connected !",
      };
    })
    .catch((err) => {
      console.log(err);
      return {
        serverMessage: "An error occured",
        error: err,
      };
    });
};

const oAuthLogin = async () => {};

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
  localStorage.setItem("access_token", accTok);
}

function storeRefreshTokenIntoLocalStorage(rfrs_tok: string) {
  localStorage.setItem("refresh_token", rfrs_tok);
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
