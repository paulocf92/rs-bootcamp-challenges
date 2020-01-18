import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.svg';

import { Container, Content, Profile, NavLink } from './styles';

export default function Header() {
  const [currentPath, setCurrentPath] = useState('');
  const username = useSelector(state => state.auth.username);
  const dispatch = useDispatch();
  const location = useLocation();

  function handleSignOut() {
    dispatch(signOut());
  }

  useEffect(() => {
    // Highlight menu based on starting path name
    const prefix = location.pathname.match(/^(\/[^/]+)/i);

    if (prefix) {
      setCurrentPath(prefix[1]);
    }
  }, [location]);

  return (
    <Container>
      <Content>
        <nav>
          <NavLink to="/students" current={currentPath}>
            <img src={logo} alt="Gympoint" />
          </NavLink>
          <NavLink to="/students" current={currentPath}>
            ALUNOS
          </NavLink>
          <NavLink to="/plans" current={currentPath}>
            PLANOS
          </NavLink>
          <NavLink to="/registrations" current={currentPath}>
            MATRÍCULAS
          </NavLink>
          <NavLink to="/help-orders" current={currentPath}>
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
