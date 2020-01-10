import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

import * as PlanActions from '~/store/modules/plan/actions';

import { MainContainer as Container } from '~/styles/common';
import { Wrapper, Header } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');

      const data = response.data.map(plan => ({
        ...plan,
        formattedDuration: `${plan.duration} ${
          plan.duration > 1 ? 'meses' : 'mês'
        }`,
        formattedPrice: formatPrice(plan.price),
      }));

      setPlans(data);
    }

    loadPlans();
  }, [setPlans]);

  function handleDeletePlan({ id, title }) {
    // eslint-disable-next-line
    if (window.confirm(`Deseja realmente excluir ${title}?`)) {
      dispatch(PlanActions.deletePlanRequest(id));
      setPlans(plans.filter(plan => plan.id !== id));
    }
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando planos</h2>
        <div>
          <Link to="/plans/register">CADASTRAR</Link>
        </div>
      </Header>

      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.formattedDuration}</td>
                <td>{plan.formattedPrice}</td>
                <td>
                  <Link to={`/plans/edit/${plan.id}`}>editar</Link>
                  <button type="button" onClick={() => handleDeletePlan(plan)}>
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Wrapper>
    </Container>
  );
}
