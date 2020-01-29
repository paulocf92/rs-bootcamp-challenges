export function addHelpOrderRequest(question) {
  return {
    type: '@helpOrder/ADD_HELP_ORDER_REQUEST',
    payload: { question },
  };
}

export function addHelpOrderSuccess() {
  return {
    type: '@helpOrder/ADD_HELP_ORDER_SUCCESS',
  };
}

export function addHelpOrderFailure() {
  return {
    type: '@helpOrder/ADD_HELP_ORDER_FAILURE',
  };
}
