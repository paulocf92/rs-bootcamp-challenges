import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 20 },
})`
  width: 100%;
`;

export const NewButton = styled(Button)`
  align-self: stretch;
  padding: 30px;
  margin: 20px 20px 0;
`;
