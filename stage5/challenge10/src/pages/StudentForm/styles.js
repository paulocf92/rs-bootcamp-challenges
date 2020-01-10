import styled from 'styled-components';

import { MainWrapper, MainHeader, buttonStyle } from '~/styles/common';

export const Header = styled(MainHeader)`
  div {
    a {
      ${buttonStyle({ btnColor: '#999' })}
    }

    button {
      ${buttonStyle({ btnColor: '#ee4d64' })}
    }
  }
`;

export const Wrapper = styled(MainWrapper)`
  form {
    display: flex;
    flex-direction: column;

    label {
      margin-right: 10px;
      font-weight: bold;
      color: #444;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;
      color: #999;
      margin: 10px 10px 10px 0;

      &::placeholder {
        color: #999;
      }
    }
  }
`;
