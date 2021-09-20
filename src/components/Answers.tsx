import React, { FunctionComponent } from 'react';
import { IRandomQuestion } from '../graphql/queries/randomQuestion';
import { useState } from 'react';
import { Button, NextButton } from './Button';
import { userScoreVar } from '../cache';
import {
  ContainerAnswers,
  ContainerBtn,
  ContainerImg,
  ContainerTitle,
} from './Containers';

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
    setColor('');
    setNextQuestion((c) => c + 1);
    userScoreVar(score);
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

        setColor('#48e3b0');
        console.log('Respuesta correcta :)');
      } else {
        setColor('#E55665');
      }
    }
  };

  return (
    <>
      <ContainerTitle backgroundColor={color}>
        <h2>{question.title}</h2>
      </ContainerTitle>
      <ContainerImg src={question.image} alt={question.title} />
      <ContainerAnswers>
        {question.answers.map((a) => {
          return (
            <ContainerBtn key={a.id}>
              <Button
                inputColor={
                  (a.id === answerSelected ? color : '') ||
                  (a.id === question.correctAnswer && isClicked
                    ? '#48e3b0'
                    : '')
                }
                key={a.id}
                onClick={() => handleAnswer(a.id)}
              >
                {a.title}
              </Button>
            </ContainerBtn>
          );
        })}
      </ContainerAnswers>

      {loadNextQuestion && (
        <>
          <NextButton onClick={handleNextQuestion}>
            Siguiente pregunta
          </NextButton>
        </>
      )}
    </>
  );
};
