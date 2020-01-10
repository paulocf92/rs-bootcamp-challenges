import styled from 'styled-components';
import { darken } from 'polished';

import { MainWrapper, MainHeader, buttonStyle } from '~/styles/common';

export const Header = styled(MainHeader)`
  div {
    a {
      ${buttonStyle({ btnColor: '#ee4d64' })}
    }
  }
`;

export const Wrapper = styled(MainWrapper)`
  table {
    width: 100%;
    border-collapse: collapse;
    color: #666;

    thead th {
      color: #444;
      text-align: left;
      padding: 5px 12px;

      &:nth-child(3) {
        text-align: center;
      }
    }

    tbody tr:not(:last-child) td {
      border-bottom: 1px solid #eee;
    }

    tbody tr {
      transition: background 0.5s;

      &:hover {
        background: ${darken(0.08, '#fff')};
      }

      td {
        padding: 12px;

        &:first-child {
          min-width: 250px;
        }

        &:nth-child(3) {
          text-align: center;
        }

        &:last-child {
          text-align: right;
        }

        a {
          border: 0;
          background: none;
          padding: 0 10px;
          transition: color 0.5s;

          color: #4d85ee;

          &:hover {
            color: ${darken(0.4, '#4d85ee')};
          }
        }

        button {
          border: 0;
          background: none;
          padding: 0 10px;
          transition: color 0.5s;
          color: #de3b3b;

          &:hover {
            color: ${darken(0.4, '#de3b3b')};
          }
        }
      }
    }
  }
`;
