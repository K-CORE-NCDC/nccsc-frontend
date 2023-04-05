import React, { useState, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';

export default function Refresh() {
  const timeout = 3000;
  const [remaining, setRemaining] = useState(timeout);
  const [elapsed, setElapsed] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  const handleOnActive = () => setIsIdle(false);
  const handleOnIdle = () => setIsIdle(true);

  const {
    reset, pause, resume, getRemainingTime, getElapsedTime,
  } = useIdleTimer({
    timeout,
    onActive: handleOnActive,
    onIdle: handleOnIdle,
  });

  const handleReset = () => reset();
  const handlePause = () => pause();
  const handleResume = () => resume();

  useEffect(() => {
    setRemaining(getRemainingTime());
    setElapsed(getElapsedTime());

    setInterval(() => {
      setRemaining(getRemainingTime());
      setElapsed(getElapsedTime());
    }, 1000);
  }, []);

  useEffect(() => {}, [isIdle]);

  return (
    <div>
      <div>
        <h1>
          Timeout:
          {timeout}
          ms
        </h1>
        <h1>
          Time Remaining:
          {remaining}
        </h1>
        <h1>
          Time Elapsed:
          {elapsed}
        </h1>
        {/* <h1>Last Active: {format(lastActive, 'MM-dd-yyyy HH:MM:ss.SSS')}</h1> */}
        <h1>
          Idle:
          {isIdle.toString()}
        </h1>
      </div>
      <div>
        <button type="button" onClick={handleReset}>RESET</button>
        <button type="button" onClick={handlePause}>PAUSE</button>
        <button type="button" onClick={handleResume}>RESUME</button>
      </div>
    </div>
  );
}
