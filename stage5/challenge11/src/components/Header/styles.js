import styled from 'styled-components/native';

import logo from '~/assets/logo-header.png';

export const Container = styled.View`
  background: #fff;
  padding: 5px 0 20px;
  align-items: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 116px;
  height: 18px;
`;
