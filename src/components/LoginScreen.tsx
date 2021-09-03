import { useApolloClient, useMutation } from '@apollo/client';
import { useForm } from '../hooks/useForm';
import { LOGIN, Ilogin, IloginInput } from '../graphql/mutations/loginUser';
import { isLoggedInVar } from '../cache';

import { useEffect } from 'react';

export const LoginScreen = () => {
  const client = useApolloClient();

  const { email, password, onChange } = useForm({
    email: 'test@test.com',
    password: '12345',
  });

  const [login, { error, data }] = useMutation<
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
    await login();
    await client.resetStore();
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            name="email"
            placeholder="correo"
            value={email}
            autoComplete="off"
            onChange={({ target }) => onChange('email', target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="contraseña"
            value={password}
            onChange={({ target }) => onChange('password', target.value)}
          />
        </div>
        <button type="submit"> Login </button>
      </form>
      <code>
        <pre> {JSON.stringify({ email, password }, null, 2)}</pre>
      </code>
      {data?.login && (
        <code>
          <pre> {JSON.stringify({ token: data.login.token }, null, 2)}</pre>
        </code>
      )}
      {error ? <p>Oh no! {error.message}</p> : null}
    </>
  );
};
