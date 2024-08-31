import { Button } from '../button/button';
import './quiz-card.scss';

export const QuizCard = ({ quiz }) => {
  const handlePickQuiz = () => {
    console.log('Pick Quiz');
  };
  console.log(quiz);
  console.log(quiz.quiz[0].columns.length);
  console.log(quiz.quiz.length);
  const rowsAmount = quiz.quiz.length;
  const columnsAmount = quiz.quiz[0].columns.length;
  const questionsAmount = rowsAmount * columnsAmount;
  return (
    <div className='quiz-card'>
      {quiz.quizName && (
        <>
          <div className='quiz-card__label'>
            <h1>{quiz.quizName}</h1>
          </div>
          <div className='quiz-card__info'>
            <p>Amount of Questions: {questionsAmount}</p>
            <p>Question Blocks: {rowsAmount}</p>
            <p>Questins in Block: {columnsAmount}</p>
          </div>
        </>
      )}
      <Button label='Choose Quiz' mode='primary' onClick={handlePickQuiz} />
    </div>
  );
};
