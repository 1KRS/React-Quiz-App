import { useEffect, useState } from 'react';

const QuestionTimer = ({ timeOnTimer, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeOnTimer);

  const intervalTime = 50;

  useEffect(() => {
    console.log('SETTING TIMEOUT');
    const timer = setTimeout(onTimeout, timeOnTimer);

    return () => clearTimeout(timer);
  }, [timeOnTimer, onTimeout]);

  useEffect(() => {
    console.log('SETTING INTERVAL');
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - intervalTime);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <progress
      id="question-time"
      max={timeOnTimer}
      value={remainingTime}
      className={mode}
    />
  );
};

export default QuestionTimer;
