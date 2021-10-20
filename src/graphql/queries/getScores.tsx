import { gql } from '@apollo/client';

export const GET_SCORES = gql`
  query GetScores($searchScoreInput: SearchScoreInput!) {
    getScores(searchScoreInput: $searchScoreInput) {
      createdAt
      time
      score
      user {
        name
      }
    }
  }
`;

export interface SearchScoreInput {
  idCategory: string;
}
interface IUser {
  name: string;
}

export interface Scores {
  createdAt: string;
  time: number;
  score: number;
  user: IUser;
}

export interface IScoreData {
  getScores: Scores[];
}
