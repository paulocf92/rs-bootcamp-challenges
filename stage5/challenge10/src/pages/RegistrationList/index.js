import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import * as RegistrationActions from '~/store/modules/registration/actions';

import { MainContainer as Container } from '~/styles/common';
import { Header, Wrapper } from './styles';

export default function RegistrationList() {
  const [registrations, setRegistrations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('/registrations');

      const data = response.data.map(registration => ({
        ...registration,
        studentName: registration.Student.name,
        planTitle: registration.PaymentPlan.title,
        startDate: format(
          parseISO(registration.start_date),
          "d 'de' MMMM 'de' Y",
          {
            locale: pt,
          },
        ),
        endDate: format(parseISO(registration.end_date), "d 'de' MMMM 'de' Y", {
          locale: pt,
        }),
        isActive: registration.active ? 'Sim' : 'Não',
      }));

      setRegistrations(data);
    }

    loadRegistrations();
  }, [setRegistrations]);

  function handleDeleteRegistration({ id, name }) {
    // eslint-disable-next-line
    if (window.confirm(`Deseja realmente excluir esta matrícula de ${name}?`)) {
      dispatch(RegistrationActions.deleteRegistrationRequest(id));
      setRegistrations(
        registrations.filter(registration => registration.id !== id),
      );
    }
  }

  return (
    <Container>
      <Header>
        <h2>Gerenciando matrículas</h2>
        <div>
          <Link to="/registrations/register">CADASTRAR</Link>
        </div>
      </Header>

      <Wrapper>
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={registration.id}>
                <td>{registration.studentName}</td>
                <td>{registration.planTitle}</td>
                <td>{registration.startDate}</td>
                <td>{registration.endDate}</td>
                <td>{registration.isActive}</td>
                <td>
                  <Link to={`/registrations/edit/${registration.id}`}>
                    editar
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteRegistration({
                        id: registration.id,
                        name: registration.studentName,
                      })
                    }
                  >
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
