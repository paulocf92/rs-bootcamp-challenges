export function addCheckInRequest() {
  return {
    type: '@checkIn/ADD_CHECKIN_REQUEST',
  };
}

export function addCheckInSuccess() {
  return {
    type: '@checkIn/ADD_CHECKIN_SUCCESS',
  };
}

export function addCheckInFailure() {
  return {
    type: '@checkIn/ADD_CHECKIN_FAILURE',
  };
}
