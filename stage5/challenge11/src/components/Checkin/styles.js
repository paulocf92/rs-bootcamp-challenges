import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  padding: 20px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckinId = styled.Text`
  font-weight: bold;
  color: #333;
`;

export const CheckinTime = styled.Text`
  color: #bbb;
`;
