import { combineReducers } from "redux"
import { appReducer } from "./app";
import { orderReducer } from "./order";
import { userReducer } from "./user"

const rootReducer = combineReducers({
  user: userReducer,
  app: appReducer,
  order: orderReducer
})

export default rootReducer;