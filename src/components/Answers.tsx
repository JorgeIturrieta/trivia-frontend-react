import React, { FunctionComponent } from 'react';
import { IRandomQuestion } from '../graphql/queries/randomQuestion';
import { useState } from 'react';
import { Button, NextButton } from './Button';
import { userScoreVar, userTimeVar } from '../cache';
import {
  NumberQuestion,
  Score,
  ContainerAnswers,
  ContainerBtn,
  ImgQuestion,
  ContainerTitle,
  ContainerImg,
} from './Containers';
import { Timer } from './Timer';
import { Title } from './Containers';

type AnswerProps = {
  question: IRandomQuestion;
  setNextQuestion: React.Dispatch<React.SetStateAction<number>>;
  numberQuestion: number;
};
export const Answers: FunctionComponent<AnswerProps> = ({
  question,
  setNextQuestion,
  numberQuestion,
}) => {
  const [loadNextQuestion, setLoadNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [answerSelected, setAnswerSelected] = useState('');
  const [color, setColor] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [time, setTime] = useState(0);
  const handleNextQuestion = () => {
    setColor('');
    setNextQuestion((c) => c + 1);
    userScoreVar(score);
    userTimeVar(time);
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
        <Title>{question.title}</Title>
      </ContainerTitle>

      <ContainerImg>
        <NumberQuestion>{numberQuestion}/10</NumberQuestion>

        <Timer time={time} setTime={setTime} />

        <Score>{score} puntos</Score>
        <ImgQuestion src={question.image} alt={question.title} />
      </ContainerImg>

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
          <NextButton onClick={handleNextQuestion}>Continuar</NextButton>
        </>
      )}
    </>
  );
};
