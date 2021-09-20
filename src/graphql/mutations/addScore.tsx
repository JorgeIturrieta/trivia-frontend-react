import { gql } from '@apollo/client';

export const ADD_SCORE = gql`
  mutation addScore($scoreInput: ScoreInput!) {
    addScore(scoreInput: $scoreInput) {
      score
    }
  }
`;

export interface IAddScore {
  score: string;
}

export interface IScoreInput {
  idCategory: string;
  score: number;
  time: number;
}
