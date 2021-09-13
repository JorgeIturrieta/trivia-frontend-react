import React, { FunctionComponent } from 'react';
import { IRandomQuestion } from '../graphql/queries/randomQuestion';
import { useState } from 'react';
import { Button, CorrectButton } from './Button';

type AnswerPros = {
  question: IRandomQuestion;
  setNextQuestion: React.Dispatch<React.SetStateAction<number>>;
};
export const Answers: FunctionComponent<AnswerPros> = ({
  question,
  setNextQuestion,
}) => {
  const [loadNextQuestion, setLoadNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const handleNextQuestion = () => {
    setNextQuestion((c) => c + 1);
    setLoadNextQuestion(false);
  };
  const handleAnswer = (id: string) => {
    if (!loadNextQuestion) {
      setLoadNextQuestion(true);
      if (id === question.correctAnswer) {
        setScore(score + 10);
        setCorrect(true);
        console.log('Respuesta correcta :)');
      }
    }
  };

  return (
    <div>
      <h2>{question.title}</h2>
      <h3>score:{score}</h3>

      <div>
        {question.answers.map((a) => {
          return correct ? (
            <CorrectButton onClick={() => handleAnswer(a.id)}>
              {a.title}
            </CorrectButton>
          ) : (
            <Button onClick={() => handleAnswer(a.id)}>{a.title}</Button>
          );
        })}
      </div>

      {loadNextQuestion && (
        <div>
          <button onClick={handleNextQuestion}>Continuar</button>
        </div>
      )}
    </div>
  );
};
