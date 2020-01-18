import styled from 'styled-components';

import { MainHeader, buttonStyle } from '~/styles/common';

export const Header = styled(MainHeader)`
  div {
    a {
      ${buttonStyle({ btnColor: '#ee4d64' })}
    }
  }
`;
