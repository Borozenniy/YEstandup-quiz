import { Button } from '../button/button';
import './quiz-card.scss';

export const QuizCard = ({ quiz }) => {
  const handlePickQuiz = () => {
    console.log('Pick Quiz');
  };
  console.log(quiz);
  return (
    <div className='quiz-card'>
      {quiz.quizName && (
        <>
          <div className='quiz-card__label'>
            <h1>{quiz.quizName}</h1>
          </div>
          <div className='quiz-card__info'>
            <p>quiz: {quiz.rows.length}</p>
          </div>
        </>
      )}
      <Button label='Choose Quiz' mode='primary' onClick={handlePickQuiz} />
    </div>
  );
};
