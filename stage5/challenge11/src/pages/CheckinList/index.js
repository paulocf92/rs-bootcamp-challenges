import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';

import api from '~/services/api';

import Checkin from '~/components/Checkin';

import { Container, List, NewButton } from './styles';

export default function CheckinList() {
  const userId = useSelector(state => state.user.profile.id);
  const [checkins, setCheckins] = useState([]);

  const loadCheckins = useCallback(async () => {
    const response = await api.get(`/students/${userId}/checkins`);

    setCheckins(response.data);
  }, [userId]);

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins]);

  function handleCheckin() {
    Alert.alert('Novo check-in', 'Realizar check-in?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await api.post(`/students/${userId}/checkins`);

            Alert.alert('Sucesso!', 'Check-in efetuado com sucesso');

            loadCheckins();
          } catch (err) {
            Alert.alert(
              'Falha no check-in!',
              'Falha ao realizar check-in, verifique os dados informados.',
            );
          }
        },
      },
    ]);
  }

  return (
    <Container>
      <NewButton onPress={handleCheckin}>Novo check-in</NewButton>

      <List
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Checkin data={item} />}
      />
    </Container>
  );
}

CheckinList.navigationOptions = {
  tabBarLabel: 'Check-ins',
};
