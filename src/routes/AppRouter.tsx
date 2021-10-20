import { HashRouter, Switch } from 'react-router-dom';
import { PublicRouter } from './PublicRouter';
import { LoginScreen } from '../components/LoginScreen';
import { PrivateRouter } from './PrivateRouter';
import { Home } from '../components/Home';
import { Redirect } from 'react-router';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from '../cache';
import { RandomQuestion } from '../components/RandomQuestion';
import { RegisterScreen } from '../components/RegisterScreen';
import { ScoreScreen } from '../components/ScoreScreen';
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

          <PublicRouter exact path="/register" isLoggedIn={isLoggedIn}>
            <RegisterScreen />
          </PublicRouter>

          <PrivateRouter exact path="/" isLoggedIn={isLoggedIn}>
            <Home />
          </PrivateRouter>

          <PrivateRouter
            exact
            path="/questions/:categoryId"
            isLoggedIn={isLoggedIn}
          >
            <RandomQuestion />
          </PrivateRouter>

          <PrivateRouter
            exact
            path="/scores/:categoryId"
            isLoggedIn={isLoggedIn}
          >
            <ScoreScreen />
          </PrivateRouter>
          <Redirect to="/" />
        </Switch>
      </div>
    </HashRouter>
  );
};
