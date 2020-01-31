import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/students/${id}`);

    const student = response.data;

    yield put(signInSuccess(student));
  } catch (err) {
    Alert.alert('Falha no login', 'Houve um erro no login, verifique sua id');
    yield put(signInFailure());
  }
}

// /**
//   Each time redux-persist reloads data, apply auth token to our api header's
//   authorization so that each request is successfully authenticated.
//   This is possible by listening to redux-persist's persist/REHYDRATE action.
// */
// export function setToken({ payload }) {
//   if (!payload) return;

//   const { token } = payload.auth;

//   if (token) {
//     api.defaults.headers.Authorization = `Bearer ${token}`;
//   }
// }

export default all([
  // takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
