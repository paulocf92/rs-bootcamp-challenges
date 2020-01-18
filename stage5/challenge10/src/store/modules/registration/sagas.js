import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  addRegistrationSuccess,
  addRegistrationFailure,
  updateRegistrationSuccess,
  updateRegistrationFailure,
  deleteRegistrationSuccess,
  deleteRegistrationFailure,
} from './actions';

export function* addRegistration({ payload }) {
  try {
    const { student_id, plan_id, start_date, end_date, price } = payload;

    yield call(api.post, 'registrations', {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    toast.success('Matrícula cadastrada com sucesso!');

    yield put(addRegistrationSuccess());

    history.push('/registrations');
  } catch (err) {
    toast.error(
      'Falha no cadastro da matrícula! Verifique os dados informados.',
    );
    yield put(addRegistrationFailure());
  }
}

export function* updateRegistration({ payload }) {
  try {
    const { id, student_id, plan_id, start_date, end_date, price } = payload;

    yield call(api.put, `registrations/${id}`, {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    toast.success('Matrícula atualizada com sucesso!');

    yield put(updateRegistrationSuccess());

    history.push('/registrations');
  } catch (err) {
    toast.error(
      'Falha na atualização da matrícula! Verifique os dados informados.',
    );
    yield put(updateRegistrationFailure());
  }
}

export function* deleteRegistration({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `registrations/${id}`);

    toast.success('Matrícula excluída com sucesso!');

    yield put(deleteRegistrationSuccess());

    history.push('/registrations');
  } catch (err) {
    toast.error('Falha na exclusão da matrícula!');
    yield put(deleteRegistrationFailure());
  }
}

export default all([
  takeLatest('@registration/ADD_REGISTRATION_REQUEST', addRegistration),
  takeLatest('@registration/UPDATE_REGISTRATION_REQUEST', updateRegistration),
  takeLatest('@registration/DELETE_REGISTRATION_REQUEST', deleteRegistration),
]);
