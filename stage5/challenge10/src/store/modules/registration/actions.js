export function addRegistrationRequest(
  student_id,
  plan_id,
  start_date,
  end_date,
  price,
) {
  return {
    type: '@registration/ADD_REGISTRATION_REQUEST',
    payload: { student_id, plan_id, start_date, end_date, price },
  };
}

export function updateRegistrationRequest(
  id,
  student_id,
  plan_id,
  start_date,
  end_date,
  price,
) {
  return {
    type: '@registration/UPDATE_REGISTRATION_REQUEST',
    payload: { id, student_id, plan_id, start_date, end_date, price },
  };
}

export function deleteRegistrationRequest(id) {
  return {
    type: '@registration/DELETE_REGISTRATION_REQUEST',
    payload: { id },
  };
}

export function addRegistrationSuccess() {
  return {
    type: '@registration/ADD_REGISTRATION_SUCCESS',
  };
}

export function updateRegistrationSuccess() {
  return {
    type: '@registration/UPDATE_REGISTRATION_SUCCESS',
  };
}

export function deleteRegistrationSuccess() {
  return {
    type: '@registration/DELETE_REGISTRATION_SUCCESS',
  };
}

export function addRegistrationFailure() {
  return {
    type: '@registration/ADD_REGISTRATION_FAILURE',
  };
}

export function updateRegistrationFailure() {
  return {
    type: '@registration/UPDATE_REGISTRATION_FAILURE',
  };
}

export function deleteRegistrationFailure() {
  return {
    type: '@registration/DELETE_REGISTRATION_FAILURE',
  };
}
