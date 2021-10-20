export const formatTime = (secondsTime: number): string => {
  let minutes = Math.floor(secondsTime / 60);
  secondsTime = secondsTime % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(secondsTime).padStart(2, '0')}`;
};
