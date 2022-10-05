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
  return await fetch(`https://w-kanban-server.herokuapp.com/api/users/signup`, init)
    .then((res: Response) => {
      return res.json();
    })
    .then((payload) => {
      if (!payload.ok) {
        return {
          serverMessage: payload.message,
        };
      }

      storeAccessTokenIntoLocalStorage(payload.accessToken);
      storeRefreshTokenIntoLocalStorage(payload.refreshToken);
      let user = {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
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
  return await fetch(`https://w-kanban-server.herokuapp.com/api/users/signin`, init)
    .then((res: Response) => {
      return res.json();
    })
    .then((payload) => {
      if (!payload.ok) {
        return {
          serverMessage: payload.message,
        };
      }

      storeAccessTokenIntoLocalStorage(payload.user.accessToken);
      storeRefreshTokenIntoLocalStorage(payload.user.refreshToken);
      let user = {
        accessToken: payload.user.accessToken,
        refreshToken: payload.user.refreshToken,
        email: payload.user.email ? payload.user.email : "",
        _id: payload.user._id,
      };

      return {
        ok: true,
        user,
        serverMessage: "Your are connected !",
      };
    })
    .catch((err) => {
      return {
        serverMessage: "An error occured",
        error: err,
      };
    });
};

const autoLogin = async () => {
  setTimeout(() => {}, 4000);
};

const getUser = async (
  data_access: {
    accessToken: string;
    refreshToken: string;
  },
): Promise<any>  => {
  const init: RequestInit = {
    method: "GET",
  };

  return await fetch(`https://w-kanban-server.herokuapp.com/api/users?access_token=${data_access.accessToken}&refresh_token=${data_access.refreshToken}`, init)
    .then((res: Response) => {
      return res.json();
    })
    .then((payload) => {
      if (!payload.ok) {
        return {
          serverMessage: "Authentication is required",
        }
      }
      return payload
    })
    .catch((err) => {
      return {
        serverMessage: "An error occured",
        error: err,
      };
    });
}

const logout = () => {
  cleanLocalStorage();
}

const oAuthLogin = async () => {};

function storeAccessTokenIntoLocalStorage(accTok: string) {
  localStorage.setItem("access_token", accTok);
}

function storeRefreshTokenIntoLocalStorage(rfrs_tok: string) {
  localStorage.setItem("refresh_token", rfrs_tok);
}

function cleanLocalStorage() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

function getAccessTokenFromLocalStorage(): any {
  let accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    return accessToken;
  }
  return null;
}

function getRefreshTokenFromLocalStorage(): any {
  let refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    return refreshToken;
  }
  return null;
}

export default {
  registerStandard,
  signinStandard,
  autoLogin,
  logout,
  getUser,
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
};
