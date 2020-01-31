import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { Container, Block, Header, Label, Time, MainText } from './styles';

export default function Detail({ navigation }) {
  const order = navigation.getParam('order');

  console.tron.log(order);

  const questionDate = useMemo(() => {
    return formatRelative(parseISO(order.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [order.createdAt]);

  const answerDate = useMemo(() => {
    return (
      !!order.answer &&
      formatRelative(parseISO(order.answer_at), new Date(), {
        locale: pt,
        addSuffix: true,
      })
    );
  }, [order.answer, order.answer_at]);

  return (
    <Container>
      <Block>
        <Header>
          <Label>PERGUNTA</Label>
          <Time>{questionDate}</Time>
        </Header>
        <MainText>{order.question}</MainText>
      </Block>
      {!!order.answer && (
        <Block>
          <Header>
            <Label>RESPOSTA</Label>
            <Time>{answerDate}</Time>
          </Header>
          <MainText>{order.answer}</MainText>
        </Block>
      )}
    </Container>
  );
}

Detail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
