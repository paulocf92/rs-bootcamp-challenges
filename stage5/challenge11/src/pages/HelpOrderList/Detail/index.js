import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

// import { Container } from './styles';

export default function Detail({ navigation }) {
  const order = navigation.getParam('order');

  return <Text>{order.question}</Text>;
}

Detail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
