import React from 'react';
import { Text } from 'react-native';

import { Container } from './styles';

export default function Checkin() {
  return (
    <Container>
      <Text>Checkin</Text>
    </Container>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
};
