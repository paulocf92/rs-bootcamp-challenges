import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import { Container, Header, Status, Time, Question } from './styles';

export default function HelpOrder({ data, onNavigate }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  function handleNavigate() {
    onNavigate(data);
  }

  return (
    <Container onPress={handleNavigate}>
      <Header>
        <Status answered={!!data.answer}>
          {data.answer ? 'Respondido' : 'Sem resposta'}
        </Status>
        <Time>{dateParsed}</Time>
      </Header>
      <Question>{data.question}</Question>
    </Container>
  );
}

HelpOrder.propTypes = {
  data: PropTypes.shape({
    createdAt: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
};
