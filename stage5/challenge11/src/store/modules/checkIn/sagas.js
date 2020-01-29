import { Alert } from 'react-native';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import api from '~/services/api';

import { addCheckInSuccess, addCheckInFailure } from './actions';

export function* addCheckIn() {
  try {
    const userId = yield select(state => state.user.profile.id);

    yield call(api.post, `/students/${userId}/checkins`);

    Alert.alert('Sucesso!', 'Check-in efetuado com sucesso');

    yield put(addCheckInSuccess());
  } catch (err) {
    Alert.alert(
      'Falha no check-in!',
      'Falha ao realizar check-in, verifique os dados informados.',
    );
    yield put(addCheckInFailure());
  }
}

export default all([takeLatest('@CheckIn/ADD_CHECKIN_REQUEST', addCheckIn)]);
