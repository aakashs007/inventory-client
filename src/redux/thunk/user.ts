import { ApiEndpoints } from "@/lib/apiEndpoints";
import { redirect } from "next/navigation";
import { Dispatch } from "react"
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from ".."
import { updateSnackbar } from "../actions/app";
import { setUserInfo, setUserList, setUserToken, userLoading } from "../actions/user";

export interface UserParams {
  user: {
    email: string | null;
    password: string | null;
  }
}

export const authenticateUser = (userParams: UserParams) => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);

    dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.post("users/sign_in", userParams);
 
    if(response && response?.data.success) {
      // save success
      const token = response.headers.authorization.split(' ')[1];

      dispatch(setUserInfo(response.data.user));
      dispatch(setUserToken(token));
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to authenticate user!', open: true}))
      // save error
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const fetchUserList = () => {
  return async(dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const apiEndPoint = new ApiEndpoints(process.env.reactHost || "", null);
    apiEndPoint.setToken(getState().user.token);
    // dispatch(userLoading({ loading : true }));

    const { success, response } = await apiEndPoint.get(`api/v1/user`);

    if(success && response?.data?.success) {
      dispatch(setUserList(response?.data?.data))
    } else {
      dispatch(updateSnackbar({ type: 'error', message: 'Unable to fetch users!', open: true}))
    }

    // dispatch(userLoading({ loading : false }));        
  }
}