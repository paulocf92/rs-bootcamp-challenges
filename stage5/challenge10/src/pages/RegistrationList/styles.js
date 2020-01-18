import styled from 'styled-components';

import { MainHeader, MainWrapper, buttonStyle } from '~/styles/common';

export const Header = styled(MainHeader)`
  div {
    a {
      ${buttonStyle({ btnColor: '#ee4d64' })}
    }
  }
`;

export const Wrapper = styled(MainWrapper)`
  table {
    th:nth-child(n + 2):nth-child(-n + 5),
    td:nth-child(n + 2):nth-child(-n + 5) {
      text-align: center;
    }
  }
`;
