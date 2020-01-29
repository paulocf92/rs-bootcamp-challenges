import { Alert } from 'react-native';
import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import api from '~/services/api';

import { addHelpOrderSuccess, addHelpOrderFailure } from './actions';

export function* addHelpOrder({ payload }) {
  try {
    const userId = yield select(state => state.user.profile.id);
    const { question } = payload;

    yield call(api.post, `/students/${userId}/help-orders`, {
      question,
    });

    Alert.alert('Sucesso!', 'Pedido de auxílio cadastrado com sucesso');

    yield put(addHelpOrderSuccess());
  } catch (err) {
    Alert.alert(
      'Falha no cadastro!',
      'Falha ao enviar o pedido de auxílio, verifique os dados informados.',
    );
    yield put(addHelpOrderFailure());
  }
}

export default all([
  takeLatest('@helpOrder/ADD_HELP_ORDER_REQUEST', addHelpOrder),
]);
