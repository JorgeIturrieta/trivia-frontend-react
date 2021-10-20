import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation signUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      token
    }
  }
`;

export interface IRegisterInput {
  email: string;
  username: string;
  password: string;
}

export interface IRegister {
  token: string;
}
