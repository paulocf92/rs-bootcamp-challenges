import React, { useEffect, useState } from 'react';

import api from '~/services/api';

import AnswerModal from './AnswerModal';

import { MainHeader as Header } from '~/styles/common';
import { Container, Wrapper } from './styles';

export default function HelpOrderList() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [helpOrder, setHelpOrder] = useState({});

  useEffect(() => {
    async function loadhelpOrders() {
      const response = await api.get('/help-orders');

      const data = response.data.map(order => ({
        ...order,
        studentName: order.Student.name,
      }));

      setHelpOrders(data);
    }

    loadhelpOrders();
  }, [setHelpOrders]);

  function onClickAnswer({ id, question }) {
    setHelpOrder({ id, question });
    setShowModal(true);
  }

  function onModalClose(answered) {
    if (answered) {
      const orders = helpOrders.filter(o => o.id !== helpOrder.id);
      setHelpOrders(orders);
      setHelpOrder({});
    }

    setShowModal(false);
  }

  return (
    <Container>
      <Header>
        <h2>Pedidos de auxílio</h2>
      </Header>

      <Wrapper>
        <AnswerModal
          showModal={showModal}
          helpOrder={helpOrder}
          onModalClose={onModalClose}
        />
        <table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(order => (
              <tr key={order.id}>
                <td>{order.studentName}</td>
                <td>
                  <button type="button" onClick={() => onClickAnswer(order)}>
                    responder
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
