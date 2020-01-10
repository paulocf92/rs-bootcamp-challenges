import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import * as PlanActions from '~/store/modules/plan/actions';

import { MainContainer as Container } from '~/styles/common';
import { Wrapper, Header } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('Título obrigatório'),
  duration: Yup.number()
    .typeError('Duração inválida')
    .positive('Duração inválida')
    .required('Duração obrigatória'),
  price: Yup.number()
    .typeError('Preço inválido')
    .positive('Preço inválido')
    .required('Preço obrigatório'),
});

export default function PlanForm({ match, updating }) {
  const dispatch = useDispatch();
  const [plan, setPlan] = useState({});

  useEffect(() => {
    async function loadPlan() {
      const { id } = match.params;
      const response = await api.get(`plans/${id}`);

      if (response.data) {
        setPlan(response.data);
      }
    }

    // If we're updating...
    if (updating) {
      loadPlan();
    }
  }, [updating, match]);

  async function handleSubmit({ title, duration, price }) {
    if (updating) {
      const { id } = match.params;
      dispatch(PlanActions.updatePlanRequest(id, title, duration, price));
    } else {
      dispatch(PlanActions.addPlanRequest(title, duration, price));
    }
  }

  return (
    <Container>
      <Header>
        <h2>{updating ? 'Edição de plano' : 'Cadastro de plano'}</h2>
        <div>
          <Link to="/plans">VOLTAR</Link>
          <button type="submit" form="planForm">
            SALVAR
          </button>
        </div>
      </Header>

      <Wrapper>
        <Form
          initialData={plan}
          schema={schema}
          id="planForm"
          onSubmit={handleSubmit}
        >
          <Input name="title" label="TÍTULO DO PLANO" />
          <div>
            <Input name="duration" type="number" label="DURAÇÃO (em meses)" />
            <Input
              name="price"
              type="number"
              step="0.01"
              label="PREÇO MENSAL"
            />
            <Input
              name="totalPrice"
              disabled
              type="number"
              label="PREÇO TOTAL"
            />
          </div>
        </Form>
      </Wrapper>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  updating: PropTypes.bool,
};

PlanForm.defaultProps = {
  updating: false,
};
