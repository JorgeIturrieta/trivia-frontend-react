import React, { FunctionComponent } from 'react';
import { IRandomQuestion } from '../graphql/queries/randomQuestion';
import { useState } from 'react';
import { Button } from './Button';

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
  const [answerSelected, setAnswerSelected] = useState('');
  const [color, setColor] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const handleNextQuestion = () => {
    setNextQuestion((c) => c + 1);
    setLoadNextQuestion(false);
    setIsClicked(false);
  };
  const handleAnswer = (id: string) => {
    if (!loadNextQuestion) {
      setIsClicked(true);
      setLoadNextQuestion(true);
      setAnswerSelected(id);
      if (id === question.correctAnswer) {
        setScore(score + 10);
        setColor('green');
        console.log('Respuesta correcta :)');
      } else {
        setColor('red');
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: 'red' }}>{question.title}</h2>
      <h3>score:{score}</h3>

      <div>
        {question.answers.map((a) => {
          return (
            <Button
              inputColor={
                (a.id === answerSelected ? color : '') ||
                (a.id === question.correctAnswer && isClicked ? 'green' : '')
              }
              key={a.id}
              onClick={() => handleAnswer(a.id)}
            >
              {a.title}
            </Button>
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
