import React from 'react';
import { HeaderWrapper } from './Containers';
import { NavLink } from 'react-router-dom';
import { LogoutScreen } from './LogoutScreen';
export const Menu = () => {
  return (
    <HeaderWrapper>
      <NavLink to={'/'} className="tags" activeStyle={{ color: 'black' }}>
        <h1>Trivia App</h1>
      </NavLink>

      <LogoutScreen />
    </HeaderWrapper>
  );
};
