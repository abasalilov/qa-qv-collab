import axios from "axios";

export const UPDATE_ACTIVE_USER = "update_active_user";
export const updateActiveUser = username => async (dispatch, getState, api) => {
  dispatch({
    type: UPDATE_ACTIVE_USER,
    payload: username
  });
};

// note might need to regress to   const res = await api.get("/ade-login");
// style
export const ADE_LOGIN_SUBMIT = "ade_login_submit";
export const ADE_LOGIN_MORTGAGE = "ADE_LOGIN_MORTGAGE";

export const adeLoginSubmit = (username, pw) => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.post(`http://localhost:5000/ade-login-user`, {
    username,
    pw
  });

  dispatch({
    type: ADE_LOGIN_SUBMIT,
    payload: res
  });

  dispatch({
    type: ADE_LOGIN_MORTGAGE,
    payload: res
  });

  if (res.data.msg === "Logged In") {
    dispatch({
      type: UPDATE_ACTIVE_USER,
      payload: username
    });
  }
};

export const REGISTER_USER = "register_user";
export const registerUser = info => async (dispatch, getState, api) => {
  const data = Object.assign({}, info);
  data.mortgage = {
    initialAmt: Number(info.loanAmount),
    termYears: Number(info.term),
    interestRate: Number(info.interestRate),
    monthlyPayment: 0
  };
  const res = await api.post("http://localhost:5000/ade-register-user", {
    data
  });
  dispatch({
    type: REGISTER_USER,
    payload: res
  });
};

export const FETCH_CURRENT_USER = "fetch_current_user";
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get("http://localhost:5000/current-user");
  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
};

export const CONFIRM_UNIQUE_USERNAME = "confirm_unique_username";
export const confirmUniqueUsername = data => async (
  dispatch,
  getState,
  api
) => {
  const res = await api.post("http://localhost:5000/ade-username-check", {
    data
  });

  dispatch({
    type: CONFIRM_UNIQUE_USERNAME,
    payload: res
  });
};

export const RESET_AUTH = "rest_auth";
export const resetAuth = () => async (dispatch, getState, api) => {
  dispatch({
    type: RESET_AUTH
  });
};

export const RESIZE_EVENT = "resize_event";
export const resizeEvent = mobile => async (dispatch, getState, api) => {
  dispatch({
    type: RESIZE_EVENT,
    payload: mobile
  });
};

/** EMAIL MSG ACTIONS */
// EMAIL_SUCCESS, EMAIL_FAILED;

/* eslint-disable */
export const VOICE_SUBMIT = "VOICE_SUBMIT";
export const VOICE_SUCCESS = "VOICE_SUCCESS";
export const VOICE_FAILED = "VOICE_FAILED";
export const submitContactUsEmail = data => async (dispatch, getState, api) => {
  dispatch({
    type: VOICE_SUBMIT
  });

  const res = await api.post("http://localhost:5000/voice", {
    data
  });
  if (res.status !== 201) {
    dispatch({
      type: EMAIL_SUCCESS
    });
  } else {
    dispatch({
      type: EMAIL_FAILED
    });
  }
};

export const SET_FORM_ERROR = "SET_FORM_ERROR";

export const setFormError = error => ({
  type: SET_FORM_ERROR,
  error
});

export const SUBMIT_TEST_PENDING = "SUBMIT_TEST_PENDING";
export const SUBMIT_TEST_COMPLETE = "SUBMIT_TEST_COMPLETE";

export const submitTest = data => async (dispatch, getState, api) => {
  console.log("1");
  dispatch({
    type: SUBMIT_TEST_PENDING,
    payload: { status: true }
  });
  const res = await api.post("http://127.0.0.1:5000/lleap-test", {
    data
  });

  dispatch({
    type: SUBMIT_TEST_COMPLETE,
    payload: res.data
  });
};

export function voiceRes() {
  let recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();

  // recognition.onresult = function(event) {
  //     console.log('You said: ', event.results[0][0].transcript);
  //     console.log('actions index: ', this);
  // };
  return {
    type: VOICE_RES,
    payload: recognition
  };
}
