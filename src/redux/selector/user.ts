import { RootState } from ".."

export const selectUserInfo = () => {
  return (state: RootState) => state.user
}

export const selectUserId = () => {
  return (state: RootState) => state.user.id
}

export const selectUserToken = () => {
  return (state: RootState) => state.user.token
}

export const selectUserLoading = () => {
  return (state: RootState) => state.user.loading
}

export const selectUserList = () => {
  return (state: RootState) => state.user.userList
}

export const selectUserEmail = () => {
  return (state: RootState) => state.user.email
}