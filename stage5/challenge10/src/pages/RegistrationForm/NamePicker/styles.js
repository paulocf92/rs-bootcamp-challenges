import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .react-select-container {
    height: 40px;
    margin: 10px 0;

    .react-select__control,
    .react-select__value-container,
    .react-select__indicators {
      height: 40px;
    }

    .react-select__control {
      border: 1px solid #ddd;
    }

    .react-select__value-container > div:last-child {
      margin-left: 10px;
    }

    .react-select__single-value,
    .react-select__placeholder {
      top: 90%;
    }

    .react-select__single-value {
      margin-left: 12px;
    }

    .react-select__placeholder {
      color: #999;
      font-size: 13px;
      padding-left: 10px;
    }
  }

  & > input {
    position: absolute;
    top: -999px;
  }
`;
