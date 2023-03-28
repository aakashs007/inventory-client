import { User } from "../actions/user";
import { initialState } from "../store/user";
import { User as UserInterface} from "../../models/user";

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case User.USER_AUTH_LOADING: {
      const loading = action.payload.loading as boolean;
      return Object.assign({}, state, { loading: loading });
    }

    case User.USER_SET_INFO: {
      const userInfo = action.payload;
      return Object.assign({}, state, { email: userInfo.email, id: userInfo.id });
    }

    case User.USER_TOKEN: {
      const token = action.payload;
      return Object.assign({}, state, { token });
    }

    case User.USER_LOGOUT: {
      return Object.assign({}, state, { ...initialState });
    }

    case User.SET_USER_LIST: {
      const userList = action.payload as Array<UserInterface>;
      return Object.assign({}, state, { userList });
    }

    default:
      return state
  }  
}