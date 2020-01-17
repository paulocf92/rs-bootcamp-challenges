import styled from 'styled-components';

export const Container = styled.div`
  & > div > div {
    display: flex;

    input {
      flex: 1;
    }
  }
`;
