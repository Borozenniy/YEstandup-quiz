import { useState, useEffect } from 'react';
import { QuizCard } from '../quiz-card/quiz-card.js';
import { fetchQuizzes } from '../../services/api/quiz/quiz.js';

import './host-quiz.scss';
import { Outlet } from 'react-router';

export const HostQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  console.log(quizzes);

  useEffect(() => {
    const fetchAndSetQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (error) {
        throw new Error('Error with fetching quizzes:', error);
      }
    };

    fetchAndSetQuizzes();
  }, []);
  return (
    <div className='host-quiz'>
      <div className='host-quiz__board'>
        <h1>Pick a quiz to host</h1>
        <div className='quiz-cards'>
          {quizzes.length > 0 &&
            quizzes.map((quiz) => <QuizCard quiz={quiz} key={quiz._id} />)}
        </div>
      </div>
      <Outlet />
    </div>
  );
};
