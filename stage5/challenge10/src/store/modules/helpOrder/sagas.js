import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import {
  updateHelpOrderAnswerSuccess,
  updateHelpOrderAnswerFailure,
} from './actions';

export function* updateHelpOrderAnswer({ payload }) {
  try {
    const { id, answer } = payload;

    yield call(api.put, `/help-orders/${id}/answer`, {
      id,
      answer,
    });

    toast.success('Resposta enviada com sucesso!');

    yield put(updateHelpOrderAnswerSuccess());
  } catch (err) {
    toast.error('Falha ao enviar resposta! Verifique os dados informados.');
    yield put(updateHelpOrderAnswerFailure());
  }
}

export default all([
  takeLatest(
    '@helpOrder/UPDATE_HELP_ORDER_ANSWER_REQUEST',
    updateHelpOrderAnswer,
  ),
]);
