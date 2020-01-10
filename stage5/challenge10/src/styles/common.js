import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MainWrapper = styled.div`
  padding: 20px 10px 10px;
  margin-top: 20px;
  color: #666;
  background: #fff;
  border-radius: 4px;
`;

export const MainHeader = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  height: 40px;

  h2 {
    color: #444;
  }

  div {
    display: flex;

    > :last-child {
      margin-left: 20px;
    }

    input {
      padding: 10px 25px;
      border-radius: 4px;
      border: 1px solid #ddd;
      color: #999;

      &::placeholder {
        color: #bbb;
      }
    }
  }
`;

export const buttonStyle = ({ btnColor }) => css`
  border: 0;
  border-radius: 4px;
  padding: 10px 30px;
  font-weight: bold;
  color: #fff;
  transition: background 0.5s;
  background: ${btnColor};

  &:hover {
    background: ${darken(0.2, btnColor)};
  }
`;
