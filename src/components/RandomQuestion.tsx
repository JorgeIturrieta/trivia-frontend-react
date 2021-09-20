import { useParams } from 'react-router';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import {
  IRandomQuestionData,
  GET_RANDOM_QUESTIONS,
  IRandomQuestionInput,
} from '../graphql/queries/randomQuestion';
import { Answers } from './Answers';
// import { LogoutScreen } from './LogoutScreen';
import { userScoreVar } from '../cache';
import {
  ADD_SCORE,
  IAddScore,
  IScoreInput,
} from '../graphql/mutations/addScore';
import { ContainerQuestion } from './Containers';

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
  const score = useReactiveVar(userScoreVar);

  const [addScore] = useMutation<
    { addScore: IAddScore },
    { scoreInput: IScoreInput }
  >(ADD_SCORE, {
    variables: { scoreInput: { idCategory: categoryId, time: 0, score } },
  });

  const handleScore = async () => {
    await addScore();
    console.log(`Score total: ${score}`);
  };

  return (
    <>
      {/* <LogoutScreen /> */}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ContainerQuestion>
          {data?.randomQuestions && (
            <>
              {data?.randomQuestions.length - 1 >= count ? (
                <Answers
                  question={data?.randomQuestions[count]}
                  setNextQuestion={setCount}
                />
              ) : (
                <>
                  <p>Felcitaciones trivia completada!</p>
                  <button onClick={handleScore}> Ver resultado</button>
                </>
              )}
            </>
          )}
        </ContainerQuestion>
      )}
      {error && <span>{error.message}</span>}
    </>
  );
};
