import styled from 'styled-components/native';

export const Container = styled.View`
  /* flex: 1; */
  /* align-items: center; */
  padding: 20px 20px 0;
  margin: 20px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Block = styled.View`
  padding-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 5px;
`;

export const Label = styled.Text`
  color: #444;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
`;

export const MainText = styled.Text`
  color: #666;
  line-height: 20px;
`;
