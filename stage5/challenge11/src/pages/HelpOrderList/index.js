import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import api from '~/services/api';

import HelpOrder from '~/components/HelpOrder';

import { Container, List, NewButton } from './styles';

export default function HelpOrderList({ navigation }) {
  const userId = useSelector(state => state.user.profile.id);
  const [helpOrders, setHelpOrders] = useState([]);

  const loadHelpOrders = useCallback(async () => {
    const response = await api.get(`/students/${userId}/help-orders`);

    setHelpOrders(response.data);
  }, [userId]);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  function handleHelpOrder() {}

  function handleDetail(order) {
    navigation.navigate('Detail', { order });
  }

  return (
    <Container>
      <NewButton onPress={handleHelpOrder}>Novo pedido de auxílio</NewButton>

      <List
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <HelpOrder data={item} onNavigate={handleDetail} />
        )}
      />
    </Container>
  );
}

HelpOrderList.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
};

HelpOrderList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
