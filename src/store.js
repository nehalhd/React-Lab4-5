import { createStore, applyMiddleware } from "redux";
import reducer from "./combineReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;