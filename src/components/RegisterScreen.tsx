import { useApolloClient, useMutation } from '@apollo/client';
import { useForm } from '../hooks/useForm';
import { isLoggedInVar } from '../cache';
import { useEffect } from 'react';
import { AuthContainer } from './AuthContainer';
import { AuthBoxContainer } from './AuthBoxContainer';
import { AuthInput } from './AuthInput';
import { AuthBtn } from './AuthBtn';
import { TitleAuth } from './TitleAuth';
import {
  IRegister,
  IRegisterInput,
  REGISTER,
} from '../graphql/mutations/registerUser';

export const RegisterScreen = () => {
  const client = useApolloClient();

  const { username, email, password, onChange } = useForm({
    username: '',
    email: '',
    password: '',
  });

  const [signUp, { data, error }] = useMutation<
    { signUp: IRegister },
    { signUpInput: IRegisterInput }
  >(REGISTER, {
    variables: { signUpInput: { password, username, email } },
  });

  useEffect(() => {
    if (data?.signUp) {
      localStorage.setItem('token', data.signUp.token);
      isLoggedInVar(!!localStorage.getItem('token'));
    }
  }, [data]);

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await signUp();
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
            name="username"
            placeholder="nombre de usuario"
            value={username}
            autoComplete="off"
            onChange={({ target }) => onChange('username', target.value)}
          />
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

          <AuthBtn type="submit"> Registrar </AuthBtn>
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
