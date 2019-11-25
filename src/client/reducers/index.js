import { combineReducers } from "redux";
import mobileReducer from "./mobileReducer";
import emailReducer from "./emailReducer";
import voiceReducer from "./voiceReducer";
import { reducer as form } from "redux-form";

export default combineReducers({
  mobile: mobileReducer,
  email: emailReducer,
  voice: voiceReducer,
  form
});
