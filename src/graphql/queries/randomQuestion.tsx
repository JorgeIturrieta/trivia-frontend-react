import { gql } from '@apollo/client';

export const GET_RANDOM_QUESTIONS = gql`
  query GetRandomQuestions($randomInput: RandomInput!) {
    randomQuestions(randomInput: $randomInput) {
      title
      correctAnswer
      answers {
        id
        title
      }
    }
  }
`;

export interface IRandomQuestionInput {
  idCategory: string;
}
export interface IAnswer {
  id: string;
  title: string;
}
export interface IRandomQuestion {
  title: string;
  correctAnswer: string;
  answers: IAnswer[];
}
export interface IRandomQuestionData {
  randomQuestions: IRandomQuestion[];
}
