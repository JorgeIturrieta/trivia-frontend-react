import React, { FunctionComponent } from 'react';
import { Redirect, Route } from 'react-router';
type PublicRouterProps = {
  path: string;
  exact: boolean;
  isLoggedIn: boolean;
};
export const PublicRouter: FunctionComponent<PublicRouterProps> = ({
  children,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  );
};
