import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';

import HelpOrder from '~/components/HelpOrder';

import { Container, List, NewButton } from './styles';

function HelpOrderList({ navigation, isFocused }) {
  const userId = useSelector(state => state.user.profile.id);
  const [helpOrders, setHelpOrders] = useState([]);

  const loadHelpOrders = useCallback(async () => {
    const response = await api.get(`/students/${userId}/help-orders`);

    setHelpOrders(response.data);
  }, [userId]);

  useEffect(() => {
    if (isFocused) {
      loadHelpOrders();
    }
  }, [isFocused, loadHelpOrders]);

  useEffect(() => {
    loadHelpOrders();
  }, [loadHelpOrders]);

  function handleHelpOrder() {
    navigation.navigate('New');
  }

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

HelpOrderList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  isFocused: PropTypes.bool,
};

HelpOrderList.defaultProps = {
  isFocused: false,
};

export default withNavigationFocus(HelpOrderList);
