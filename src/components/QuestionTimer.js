import { useEffect, useState } from 'react';

const QuestionTimer = ({ timeOnTimer, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState(timeOnTimer);

  const intervalTime = 50;

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeOnTimer);

    return () => clearTimeout(timer);
  }, [timeOnTimer, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - intervalTime);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress id="question-time" max={timeOnTimer} value={remainingTime} />
  );
};

export default QuestionTimer;
