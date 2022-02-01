import { combineReducers } from "redux";
import languageReducer from "./language";

import movieReducer from "./reducers";

export default combineReducers({

  movie: movieReducer,
  language: languageReducer,

});