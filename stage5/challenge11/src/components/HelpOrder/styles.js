import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 15px 20px;
  margin-bottom: 10px;
`;

export const Header = styled.View`
  padding-bottom: 10px;

  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.Text`
  font-weight: bold;
  color: ${props => (props.answered ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  color: #666;
`;

export const Question = styled.Text`
  color: #666;
`;
