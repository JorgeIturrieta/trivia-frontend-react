import { useParams } from 'react-router';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { useState, useEffect, useCallback } from 'react';
import {
  IRandomQuestionData,
  GET_RANDOM_QUESTIONS,
  IRandomQuestionInput,
} from '../graphql/queries/randomQuestion';
import { Answers } from './Answers';
// import { LogoutScreen } from './LogoutScreen';
import { userScoreVar, userTimeVar } from '../cache';
import {
  ADD_SCORE,
  IAddScore,
  IScoreInput,
} from '../graphql/mutations/addScore';
import { ContainerQuestion } from './Containers';
import { Link } from 'react-router-dom';
import { Menu } from './Menu';

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
  const time = useReactiveVar(userTimeVar);
  const [addScore] = useMutation<
    { addScore: IAddScore },
    { scoreInput: IScoreInput }
  >(ADD_SCORE, {
    variables: { scoreInput: { idCategory: categoryId, time, score } },
  });

  const handleScore = useCallback(async () => {
    await addScore();
  }, [addScore]);

  useEffect(() => {
    if (data?.randomQuestions.length) {
      if (data?.randomQuestions.length - 1 < count) {
        handleScore();
      }
    }
    return () => {
      console.log('componente desmontado');
    };
  }, [count, data, handleScore]);

  return (
    <>
      <Menu />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ContainerQuestion>
          {data?.randomQuestions && (
            <>
              {data?.randomQuestions.length - 1 >= count && (
                <Answers
                  question={data?.randomQuestions[count]}
                  setNextQuestion={setCount}
                  numberQuestion={count + 1}
                />
              )}

              {data.randomQuestions.length > 0 &&
                data?.randomQuestions.length - 1 < count && (
                  <>
                    <p>¡Felcitaciones trivia completada!</p>
                    <Link to={`/scores/${categoryId}`}>Ver resultados</Link>
                  </>
                )}

              {data.randomQuestions.length === 0 && (
                <>
                  <p>Esta categoría aun no tiene pregutas</p>
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
