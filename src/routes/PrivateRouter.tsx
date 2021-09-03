import React, { FunctionComponent } from 'react';
import { Redirect, Route } from 'react-router';
type PrivateRouterProps = {
  path: string;
  exact: boolean;
  isLoggedIn: boolean;
};
export const PrivateRouter: FunctionComponent<PrivateRouterProps> = ({
  children,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};
