import React, { useEffect, useState, useRef } from 'react'
import './AnswerTimer.scss';

function AnswerTimer({ duration, onTimeUp }) {
  const [counter, setCounter] = useState(0);
  const [progressBar, setProgressBar] = useState(0);
  const intervelRef = useRef();

  useEffect(() => {
    intervelRef.current = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => clearInterval(intervelRef.current);
  }, [])

  useEffect(() => {
    setProgressBar(100 * (counter / duration));

    if (counter === duration) {
      clearInterval(intervelRef.current);
      // setTimeout(() => {
      //   onTimeUp();
      // }, 1000)
      if (typeof onTimeUp === 'function') {
        onTimeUp(); // Ensure onTimeUp is a function before calling it
      }
    }
  }, [counter,duration, onTimeUp])

  return (
    <div className='answer-timer-container'>
      <div
        data-testid='progress-bar'
        style={{
          width: `${progressBar}%`,
          backgroundColor: `${progressBar < 50 ? 'lightGreen'
              :
              progressBar < 70 ? 'orange'
                :
                'red'
            }`
        }}
        className='progress'
      >
      </div>
    </div>
  )
}

export default AnswerTimer