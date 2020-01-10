export function addPlanRequest(title, duration, price) {
  return {
    type: '@plan/ADD_PLAN_REQUEST',
    payload: { title, duration, price },
  };
}

export function updatePlanRequest(id, title, duration, price) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function deletePlanRequest(id) {
  return {
    type: '@plan/DELETE_PLAN_REQUEST',
    payload: { id },
  };
}

export function addPlanSuccess() {
  return {
    type: '@plan/ADD_PLAN_SUCCESS',
  };
}

export function updatePlanSuccess() {
  return {
    type: '@plan/UPDATE_PLAN_SUCCESS',
  };
}

export function deletePlanSuccess() {
  return {
    type: '@plan/DELETE_PLAN_SUCCESS',
  };
}

export function addPlanFailure() {
  return {
    type: '@plan/ADD_PLAN_FAILURE',
  };
}

export function updatePlanFailure() {
  return {
    type: '@plan/UPDATE_PLAN_FAILURE',
  };
}

export function deletePlanFailure() {
  return {
    type: '@plan/DELETE_PLAN_FAILURE',
  };
}
