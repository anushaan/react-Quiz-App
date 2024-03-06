import React, { useState } from 'react';
import { resultIntialState } from '../../constants';
import AnswerTimer from '../AnswerTimer/AnswerTimer';
import Results from '../Results/Results';
import './Quiz.scss';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState(null);
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(resultIntialState);
  const [showResult, setShowResult] = useState(false);
  const [showAnswerTimer, setShowAnswerTimer] = useState(true);
  const [inputAnswer, setInputAnswer] = useState('');

  const { question, choices, correctAnswer,type } = questions[currentQuestion];

  const onAnswerClick = (choice, index) => {
    setChoiceIndex(index);
    if (choice === correctAnswer) {
      setChoice(true)
    } else {
      setChoice(false)
    }
  }
  const onClickNext = (finalAnswer) => {
    setChoiceIndex(null)
    setShowAnswerTimer(false)
    setResult((prev) => (
      finalAnswer ? {
        ...prev,
        score: prev.score + 5,
        correctAnswer: prev.correctAnswer + 1
      } : {
        ...prev,
        wrongAnswer: prev.wrongAnswer + 1
      }
    ))
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setCurrentQuestion(0);
      setShowResult(true)
    }
    setInterval(() => {
      setShowAnswerTimer(true)
    })
  }
  const onTryAgain = () => {
    setResult(resultIntialState)
    setShowResult(false)
    setInputAnswer('')
  }

  const handleTimeUp = () => {
    setChoice(false);
    onClickNext(false)
  }
  const handleOnChange = (e) => { 
    setInputAnswer(e.target.value)
    if(e.target.value === correctAnswer) {
      setChoice(true)
    }else {
      setChoice(false)
    }
  }

  const getAnswerUI = () => {
    if(type === 'FIB') {
      return <input value={inputAnswer} onChange={handleOnChange} placeholder="Enter the Answer..."/> 
    }
    
    return ( <ul>
      {choices.map((choice, index) => (
        <li
          key={choice}
          onClick={() => onAnswerClick(choice, index)}
          className={choiceIndex === index ? 'seleted-answer' : null}
        >
          {choice}
        </li>
      ))}
    </ul>)
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
         {showAnswerTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>}
          <span className='active-question-no'>{currentQuestion + 1}</span>
          <span className='total-question'>/{questions.length}</span>
          <h2>{question}</h2>
          {getAnswerUI()}
          <div className='footer'>
            <button
              onClick={() => onClickNext(choice)}
              disabled={(type === "FIB" && !inputAnswer) || (type !== "FIB" && choiceIndex === null)}
            >
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )
        : (<Results 
            questions={questions.length}
            result={result}
            onTryAgain={onTryAgain}/>)
      }
    </div>
  )
}

export default Quiz