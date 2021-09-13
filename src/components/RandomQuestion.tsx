import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import {
  IRandomQuestionData,
  GET_RANDOM_QUESTIONS,
  IRandomQuestionInput,
} from '../graphql/queries/randomQuestion';
import { Answers } from './Answers';
import { LogoutScreen } from './LogoutScreen';

type Params = {
  categoryId: string;
};

export const RandomQuestion = () => {
  const { categoryId } = useParams<Params>();

  const { loading, data, error } = useQuery<
    IRandomQuestionData,
    { randomInput: IRandomQuestionInput }
  >(GET_RANDOM_QUESTIONS, {
    variables: { randomInput: { idCategory: categoryId } },
  });

  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>RandomQuestion</h1>
      <LogoutScreen />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {data?.randomQuestions && (
            <>
              {data?.randomQuestions.length - 1 >= count ? (
                <Answers
                  question={data?.randomQuestions[count]}
                  setNextQuestion={setCount}
                />
              ) : (
                <p>Felcitaciones trivia completada!</p>
              )}
            </>
          )}
        </div>
      )}
      {error && <span>{error.message}</span>}
    </div>
  );
};
