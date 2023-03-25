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

export const selectCurrentUserRole = () => {
  return (state: RootState) => {
    const userId = state.user.id;
    const userInfo = state.user.userList.find((user: any) => user.id == userId);

    if(userInfo) {
      return userInfo.user_type
    }
    
    return null;
  }
}