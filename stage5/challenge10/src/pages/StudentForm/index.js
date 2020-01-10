import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import * as StudentActions from '~/store/modules/student/actions';

import { MainContainer as Container } from '~/styles/common';
import { Wrapper, Header } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail obrigatório'),
  age: Yup.number()
    .typeError('Idade inválida')
    .positive('Idade inválida')
    .required('Idade obrigatória'),
  weight: Yup.number()
    .typeError('Peso inválido')
    .positive('Idade inválida')
    .required('Peso obrigatório'),
  height: Yup.number()
    .typeError('Altura inválida')
    .positive('Idade inválida')
    .required('Altura obrigatória'),
});

export default function StudentForm({ match, updating }) {
  const dispatch = useDispatch();
  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadStudent() {
      const { id } = match.params;
      const response = await api.get(`students/${id}`);

      if (response.data) {
        setStudent(response.data);
      }
    }

    // If we're updating...
    if (updating) {
      loadStudent();
    }
  }, [updating, match]);

  async function handleSubmit({ name, email, age, weight, height }) {
    if (updating) {
      const { id } = match.params;
      dispatch(
        StudentActions.updateStudentRequest(
          id,
          name,
          email,
          age,
          weight,
          height,
        ),
      );
    } else {
      dispatch(
        StudentActions.addStudentRequest(name, email, age, weight, height),
      );
    }
  }

  return (
    <Container>
      <Header>
        <h2>{updating ? 'Edição de aluno' : 'Cadastro de aluno'}</h2>
        <div>
          <Link to="/students">VOLTAR</Link>
          <button type="submit" form="studentForm">
            SALVAR
          </button>
        </div>
      </Header>

      <Wrapper>
        <Form
          initialData={student}
          schema={schema}
          id="studentForm"
          onSubmit={handleSubmit}
        >
          <Input name="name" label="NOME COMPLETO" />
          <Input name="email" label="ENDEREÇO DE E-MAIL" />
          <div>
            <Input name="age" type="number" label="IDADE" />
            <Input
              name="weight"
              type="number"
              step="0.01"
              label="PESO (em kg)"
            />
            <Input name="height" type="number" step="0.01" label="ALTURA" />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  updating: PropTypes.bool,
};

StudentForm.defaultProps = {
  updating: false,
};
