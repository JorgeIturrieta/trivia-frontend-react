import React from 'react';
import { CategoryScreen } from './CategoryScreen';
import { LogoutScreen } from './LogoutScreen';

export const Home = () => {
  return (
    <div>
      <h1>Bienvenido a la app de Trivia</h1>
      <LogoutScreen />
      <CategoryScreen />
    </div>
  );
};
