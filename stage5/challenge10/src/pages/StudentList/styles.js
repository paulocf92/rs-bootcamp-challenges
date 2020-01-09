import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  h2 {
    color: #444;
  }

  > div {
    padding: 20px 10px 10px;
    margin-top: 20px;
    color: #666;
    background: #fff;
    border-radius: 4px;
  }
`;

export const StudentTable = styled.table`
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

      &:nth-child(4) {
        text-align: right;
      }

      button {
        border: 0;
        background: none;
        padding: 0 10px;
        transition: color 0.5s;

        &:first-child {
          color: #4d85ee;

          &:hover {
            color: ${darken(0.4, '#4d85ee')};
          }
        }

        &:last-child {
          color: #de3b3b;

          &:hover {
            color: ${darken(0.4, '#de3b3b')};
          }
        }
      }
    }
  }
`;

export const ListHeader = styled.header`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  div {
    button {
      border: 0;
      background: #ee4d64;
      border-radius: 4px;
      padding: 10px 15px;
      font-weight: bold;
      color: #fff;
      transition: background 0.5s;

      &:hover {
        background: ${darken(0.2, '#ee4d64')};
      }
    }

    input {
      margin-left: 20px;
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
