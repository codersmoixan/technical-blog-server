import store from "store";
import expirePlugin from "store/plugins/expire";

export interface Authorization {
  token: string;
  type: string;
}

store.addPlugin(expirePlugin);

const AUTH_TOKEN = "token";
const AUTH_TYPE = "type";
const PATH_NAME = "pathname";

const setAuthorization = (token: string, type = "user") => {
  store.set(AUTH_TOKEN, token, new Date().getTime() + 86400000);
  store.set(AUTH_TYPE, type, new Date().getTime() + 86400000);
};

const deleteAuthorization = () => {
  store.remove(AUTH_TOKEN);
  store.remove(AUTH_TYPE);
};

const getAuthorization = (): Authorization => ({
  token: store.get(AUTH_TOKEN),
  type: store.get(AUTH_TYPE),
});

const setPathname = (pathname: string) => store.set(PATH_NAME, pathname);
const getPathname = () => store.get(PATH_NAME);

const isSignedIn = (): boolean =>
  !!getAuthorization() && getAuthorization().type === "user";

export {
  setAuthorization,
  getAuthorization,
  deleteAuthorization,
  isSignedIn,
  setPathname,
  getPathname,
};
