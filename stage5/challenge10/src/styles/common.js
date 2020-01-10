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
