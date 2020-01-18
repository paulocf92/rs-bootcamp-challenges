import styled from 'styled-components';
import { darken } from 'polished';

import { MainWrapper, MainContainer } from '~/styles/common';

export const Container = styled(MainContainer)`
  width: 600px;
  margin: 0 auto;
  flex: none;
`;

export const Wrapper = styled(MainWrapper)`
  table {
    tbody tr td {
      button {
        color: #4d85ee;

        &:hover {
          color: ${darken(0.4, '#4d85ee')};
        }
      }
    }
  }
`;
