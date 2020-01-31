import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function New({ navigation }) {
  const userId = useSelector(state => state.user.profile.id);
  const [question, setQuestion] = useState('');

  async function handleSubmit() {
    try {
      await api.post(`/students/${userId}/help-orders`, {
        question,
      });

      navigation.navigate('HelpOrderList');

      Alert.alert('Sucesso!', 'Pedido de auxílio envado com sucesso');
    } catch (err) {
      Alert.alert(
        'Falha no envio!',
        'Falha ao enviar pedido de auxílio, verifique os dados informados.',
      );
    }
  }

  return (
    <Container>
      <Form>
        <FormInput
          multiline
          numberOfLines={18}
          style={{ minHeight: 360 }}
          textAlignVertical="top"
          autoCapitalize="none"
          placeholder="Inclua seu pedido de auxílio"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={question}
          onChangeText={setQuestion}
        />

        <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
      </Form>
    </Container>
  );
}

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
