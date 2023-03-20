import { App } from "../actions/app";
import { initialState } from "../store/app";

export function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case App.UPDATE_SNACKBAR: {
      const payload = action.payload;
      return Object.assign({}, state, { snackbar: { ...payload } });
    }

    case App.OPEN_SIDE_DRAWER: {
      const payload: boolean = action.payload;
      return Object.assign({}, state, { sideDrawerOpen: payload });
    }

    default:
      return state
  }  
}