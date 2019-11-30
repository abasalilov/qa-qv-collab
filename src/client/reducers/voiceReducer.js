import {
  VOICE_SUBMIT,
  VOICE_SUCCESS,
  VOICE_FAILED,
  SUBMIT_TEST_PENDING,
  SUBMIT_TEST_COMPLETE
} from "../actions";

export default function(
  state = {
    pending: false,
    result: false,
    query: "",
    feedback: [],
    actions: []
  },
  action
) {
  switch (action.type) {
    case VOICE_SUBMIT:
      const voiceTestState = Object.assign({}, state);
      voiceTestState.pending = true;
      return voiceTestState;

    case VOICE_SUCCESS:
      const voiceSuccessState = Object.assign({}, state);
      console.log("action", action);
      voiceSuccessState.feedback = action.payload.fb;
      voiceSuccessState.actions = action.payload.actions;
      return voiceSuccessState;

    case VOICE_FAILED:
      const voiceFailedState = Object.assign({}, state);
      voiceFailedState.result = action.payload;
      return voiceFailedState;

    case SUBMIT_TEST_PENDING:
      const submitTestStartState = Object.assign({}, state);
      submitTestStartState.result = action.payload;
      return submitTestStartState;

    case SUBMIT_TEST_COMPLETE:
      const submitTestEndState = Object.assign({}, state);
      submitTestEndState.result = action.payload;
      return submitTestEndState;

    default:
      return state;
  }
}
