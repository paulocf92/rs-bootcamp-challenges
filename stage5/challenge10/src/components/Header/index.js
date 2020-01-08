import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.svg';

import { Container, Content, Profile, NavLink } from './styles';

export default function Header() {
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();
  const location = useLocation();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <NavLink to="/students" current={location.pathname}>
            <img src={logo} alt="Gympoint" />
          </NavLink>
          <NavLink to="/students" current={location.pathname}>
            ALUNOS
          </NavLink>
          <NavLink to="/plans" current={location.pathname}>
            PLANOS
          </NavLink>
          <NavLink to="/registrations" current={location.pathname}>
            MATRÍCULAS
          </NavLink>
          <NavLink to="/help-orders" current={location.pathname}>
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{username}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
