import { useState, useEffect } from 'react';
import Quiz from './components/Quiz/Quiz';
import { getApiQuestions } from './api';

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestions();
  },[])

  const getQuestions = async() => {
    try{
      const response = await getApiQuestions();
      
      const questionsResponse = await response.json();
      console.log(questionsResponse);
      setQuestions(questionsResponse);
    }catch(e) {
      console.log(e);
    }
  }
  return (
    <div>
      {questions.length && <Quiz questions={questions}/>}
    </div>
  )
}

export default App
