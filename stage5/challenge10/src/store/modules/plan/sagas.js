import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  addPlanSuccess,
  addPlanFailure,
  updatePlanSuccess,
  updatePlanFailure,
  deletePlanSuccess,
  deletePlanFailure,
} from './actions';

export function* addPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    toast.success('Plano cadastrado com sucesso!');

    yield put(addPlanSuccess());

    history.push('/plans');
  } catch (err) {
    toast.error('Falha no cadastro do plano! Verifique os dados informados.');
    yield put(addPlanFailure());
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload;

    yield call(api.put, `plans/${id}`, {
      title,
      duration,
      price,
    });

    toast.success('Plano atualizado com sucesso!');

    yield put(updatePlanSuccess());

    history.push('/plans');
  } catch (err) {
    toast.error(
      'Falha na atualização do plano! Verifique os dados informados.',
    );
    yield put(updatePlanFailure());
  }
}

export function* deletePlan({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `plans/${id}`);

    toast.success('Plano excluído com sucesso!');

    yield put(deletePlanSuccess());

    history.push('/plans');
  } catch (err) {
    toast.error('Falha na exclusão do plano!');
    yield put(deletePlanFailure());
  }
}

export default all([
  takeLatest('@plan/ADD_PLAN_REQUEST', addPlan),
  takeLatest('@plan/UPDATE_PLAN_REQUEST', updatePlan),
  takeLatest('@plan/DELETE_PLAN_REQUEST', deletePlan),
]);
