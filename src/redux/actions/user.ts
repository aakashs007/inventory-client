export enum User {
  USER_AUTH_LOADING = "user/USER_AUTH_LOADING",
  USER_SET_INFO = "user/USER_SET_INFO",
  USER_TOKEN = "user/USER_TOKEN",
  USER_LOGOUT = "user/USER_LOGOUT",
  SET_USER_LIST = "user/SET_USER_LIST"
}

export const userLoading = (payload: any) => {
  return { type: User.USER_AUTH_LOADING, payload }
}

export const setUserInfo = (payload: { email: string; id: number }) => {
  return { type: User.USER_SET_INFO, payload };
}

export const setUserToken = (payload: string) => {
  return { type: User.USER_TOKEN, payload };
}

export const logoutUser = () => {
  return { type: User.USER_LOGOUT }
}

export const setUserList = (payload: any) => {
  return { type: User.SET_USER_LIST, payload }
}