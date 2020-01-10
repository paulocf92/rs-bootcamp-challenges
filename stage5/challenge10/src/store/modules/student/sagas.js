import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  addStudentSuccess,
  addStudentFailure,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} from './actions';

export function* addStudent({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('Aluno cadastrado com sucesso!');

    yield put(addStudentSuccess());

    history.push('/students');
  } catch (err) {
    toast.error('Falha no cadastro do aluno! Verifique os dados informados.');
    yield put(addStudentFailure());
  }
}

export function* updateStudent({ payload }) {
  try {
    const { id, name, email, age, weight, height } = payload;

    yield call(api.put, `students/${id}`, {
      name,
      email,
      age,
      weight,
      height,
    });

    toast.success('Aluno atualizado com sucesso!');

    yield put(updateStudentSuccess());

    history.push('/students');
  } catch (err) {
    toast.error(
      'Falha na atualização do aluno! Verifique os dados informados.',
    );
    yield put(updateStudentFailure());
  }
}

export function* deleteStudent({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `students/${id}`);

    toast.success('Aluno excluído com sucesso!');

    yield put(deleteStudentSuccess());

    history.push('/students');
  } catch (err) {
    toast.error('Falha na exclusão do aluno!');
    yield put(deleteStudentFailure());
  }
}

export default all([
  takeLatest('@student/ADD_STUDENT_REQUEST', addStudent),
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
  takeLatest('@student/DELETE_STUDENT_REQUEST', deleteStudent),
]);
