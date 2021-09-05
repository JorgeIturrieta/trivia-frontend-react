import { HashRouter, Switch } from 'react-router-dom';
import { PublicRouter } from './PublicRouter';
import { LoginScreen } from '../components/LoginScreen';
import { PrivateRouter } from './PrivateRouter';
import { Home } from '../components/Home';
import { Redirect } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../cache';
export const AppRouter = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log(isLoggedIn);
  return (
    <HashRouter>
      <div>
        <Switch>
          <PublicRouter exact path="/login" isLoggedIn={isLoggedIn}>
            <LoginScreen />
          </PublicRouter>

          <PrivateRouter exact path="/" isLoggedIn={isLoggedIn}>
            <Home />
          </PrivateRouter>
          <Redirect to="/" />
        </Switch>
      </div>
    </HashRouter>
  );
};
