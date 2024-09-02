import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import './quiz-card.scss';

export const QuizCard = ({ quiz }) => {
  const navigate = useNavigate();

  const pickQuizToHost = () => {
    navigate(`/app/host/session`);
  };
  //console.log(quiz);
  //console.log(quiz.quiz[0].columns.length);
  //console.log(quiz.quiz.length);
  const rowsAmount = quiz.quiz.length;
  const columnsAmount = quiz.quiz[0].columns.length;
  const questionsAmount = rowsAmount * columnsAmount;
  return (
    <div className='quiz-card'>
      {quiz.quizName && (
        <>
          <div className='quiz-card__label'>
            <h1>{quiz.quizName}</h1>
            {/*<div>
              <Button label='->' mode='primary' onClick={handlePickQuiz} />
            </div>*/}
          </div>
          <div className='quiz-card__info'>
            <p>Amount of Questions: {questionsAmount}</p>
            <p>Question Blocks: {rowsAmount}</p>
            <p>Questins in Block: {columnsAmount}</p>
          </div>
        </>
      )}
      <div className='quiz-card__button'>
        <Button label='Choose Quiz' mode='primary' onClick={pickQuizToHost} />
      </div>
    </div>
  );
};
