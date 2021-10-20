import React from 'react';
import { useEffect, useState } from 'react';
import { formatTime } from '../helpers/formatTime';
import { TimeContainer } from './Containers';
type TimerProps = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};
export const Timer = ({ time, setTime }: TimerProps) => {
  const [timeOut, setTimeOut] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((s) => s + 1);
    }, 1000);
    setTimeOut(timer);
    return () => {
      if (timeOut) {
        clearInterval(timeOut);
      }
    };
  }, []); // eslint-disable-line

  return (
    <>
      <TimeContainer>
        <span>{formatTime(time)}</span>
      </TimeContainer>
    </>
  );
};
