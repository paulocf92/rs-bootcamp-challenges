import styled from 'styled-components';
import Modal from 'react-modal';

import { buttonStyle } from '~/styles/common';

Modal.setAppElement('#root');

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 80px;
  left: 40px;
  right: 40px;
  width: 400px;
  margin: 0 auto;
  border: none;
  color: #666;
  background: #fff;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;

  div {
    display: flex;
    flex-direction: column;

    & > * {
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
    }

    h2 {
      color: #444;
      margin-bottom: 5px;
    }

    p {
      margin-bottom: 10px;
    }

    textarea {
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 4px;
      border: 1px solid #ddd;
      resize: none;
      color: #999;

      &::placeholder {
        color: #bbb;
      }
    }

    button {
      ${buttonStyle({ btnColor: '#ee4d64' })}
    }

    span {
      margin-top: 10px;
      font-weight: bold;
      color: #fb6f91;
    }
  }
`;
