import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`;

export interface IloginInput {
  username: string;
  password: string;
}

export interface Ilogin {
  token: string;
}
