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

const autoLogin = async () => {
  setTimeout(() => {}, 4000);
};

const oAuthLogin = async () => {};

function storeAccessTokenIntoLocalStorage(accTok: string) {
  localStorage.setItem("access_token", accTok);
}

function storeRefreshTokenIntoLocalStorage(rfrs_tok: string) {
  localStorage.setItem("refresh_token", rfrs_tok);
}

function removeUserFromLocalStorage() {
  localStorage.removeItem("usr");
}

function getAccessTokenFromLocalStorage(): any {
  let access_token = localStorage.getItem("access_token");
  if (access_token) {
    return access_token;
  }
  return null;
}

function getRefreshTokenFromLocalStorage(): any {
  let refresh_token = localStorage.getItem("refresh_token");
  if (refresh_token) {
    return refresh_token;
  }
  return null;
}

export default {
  registerStandard,
  signinStandard,
  autoLogin,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
};
