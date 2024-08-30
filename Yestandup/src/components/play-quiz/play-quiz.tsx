import { useState } from 'react';
import { QuizCard } from '../quiz-card/quiz-card';
import { Button } from '../button/button';
import './play-quiz.scss';

export const PlayQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/quiz/get-quizzes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const quizzes = await response.json();
      setQuizzes(quizzes);
    } catch (error) {
      throw new Error('Error with fetching quizzes:' + error);
    }
  };
  console.log(quizzes);
  return (
    <div className='play-quiz'>
      <div className='play-quiz__board'>
        <Button label='Get Quizzes' mode='primary' onClick={fetchQuizzes} />
        <div className='quiz-cards'>
          {quizzes &&
            quizzes.map((quiz) => <QuizCard quiz={quiz} key={quiz._id} />)}
        </div>
      </div>
    </div>
  );
};
