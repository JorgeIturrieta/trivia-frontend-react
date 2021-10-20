import { useApolloClient, useMutation } from '@apollo/client';
import { useForm } from '../hooks/useForm';
import { LOGIN, Ilogin, IloginInput } from '../graphql/mutations/loginUser';
import { isLoggedInVar } from '../cache';
import { useEffect } from 'react';
import { AuthContainer } from './AuthContainer';
import { AuthBoxContainer } from './AuthBoxContainer';
import { AuthInput } from './AuthInput';
import { AuthBtn } from './AuthBtn';
import { TitleAuth } from './TitleAuth';
import { Link } from 'react-router-dom';
export const LoginScreen = () => {
  const client = useApolloClient();

  const { email, password, onChange } = useForm({
    email: '',
    password: '',
  });

  const [login, { data, error }] = useMutation<
    { login: Ilogin },
    { loginInput: IloginInput }
  >(LOGIN, {
    variables: { loginInput: { password, username: email } },
  });

  useEffect(() => {
    if (data?.login) {
      localStorage.setItem('token', data.login.token);
      isLoggedInVar(!!localStorage.getItem('token'));
    }
  }, [data]);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await login();
      await client.resetStore();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContainer>
      <AuthBoxContainer>
        <TitleAuth>Trivia App</TitleAuth>
        <form onSubmit={submit}>
          <AuthInput
            type="text"
            name="email"
            placeholder="correo"
            value={email}
            autoComplete="off"
            onChange={({ target }) => onChange('email', target.value)}
          />

          <AuthInput
            type="password"
            name="password"
            placeholder="contraseña"
            value={password}
            onChange={({ target }) => onChange('password', target.value)}
          />

          <AuthBtn type="submit"> Iniciar sesión </AuthBtn>
          <hr />
          <Link to="/register" className="link">
            Registrarse
          </Link>
        </form>
        {/* <code>
          <pre> {JSON.stringify({ email, password }, null, 2)}</pre>
        </code>
        {data?.login && (
          <code>
            <pre> {JSON.stringify({ token: data.login.token }, null, 2)}</pre>
          </code>
        )} */}
        {error ? <p>Oh no! {JSON.stringify(error.message, null, 2)}</p> : null}
      </AuthBoxContainer>
    </AuthContainer>
  );
};
