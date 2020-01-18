import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  padding: 0 30px;
  background: #fff;
  border: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 155px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const NavLink = styled(Link)`
  padding-right: 20px;
  font-weight: bold;
  transition: color 0.5s;
  color: ${props => (props.to === props.current ? '#444' : '#999')};

  &:hover {
    color: ${props =>
      props.to === props.current ? '#444' : darken(0.4, '#999')};
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;

    strong {
      display: block;
      font-weight: bold;
      color: #666;
    }

    button {
      border: 0;
      background: none;
      transition: color 0.5s;
      color: #de3b3b;

      &:hover {
        color: ${darken(0.15, '#de3b3b')};
      }
    }
  }
`;
