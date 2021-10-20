import React from 'react';
import { isLoggedInVar } from '../cache';

export const LogoutScreen = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    isLoggedInVar(!!localStorage.getItem('token'));
  };
  return (
    <div>
      <span onClick={handleLogout}>Cerrar Sesión</span>
    </div>
  );
};
