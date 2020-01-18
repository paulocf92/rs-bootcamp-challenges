export function updateHelpOrderAnswerRequest(id, answer) {
  return {
    type: '@helpOrder/UPDATE_HELP_ORDER_ANSWER_REQUEST',
    payload: { id, answer },
  };
}

export function updateHelpOrderAnswerSuccess() {
  return {
    type: '@helpOrder/UPDATE_HELP_ORDER_ANSWER_SUCCESS',
  };
}

export function updateHelpOrderAnswerFailure() {
  return {
    type: '@helpOrder/UPDATE_HELP_ORDER_ANSWER_FAILURE',
  };
}
