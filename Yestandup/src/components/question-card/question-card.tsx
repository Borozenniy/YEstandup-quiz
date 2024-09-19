import { useState, useContext } from 'react';
import { ModalContext } from '../../modal/modal-provider';
import { StatusBar } from '../status-bar/status-bar';
import { Button } from '../button/button';
import './question-card.scss';

export const QuestionCard = ({ session, currentQuestion }) => {
  const { closeModal } = useContext(ModalContext) as any;
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswer = () => {
    console.log('Show answer');
  };
  console.log(currentQuestion);

  return (
    <div className='question-card'>
      <div className='question-card__wrapper'>
        {showAnswer ? (
          <>
            <div className='question-card__label'>
              <p>{currentQuestion.answer}</p>
            </div>
            <div>
              <Button
                label='Back to table'
                mode='primary'
                onClick={closeModal}
              />
            </div>
          </>
        ) : (
          <>
            <div className='question-card__label'>
              <p>{currentQuestion.question}</p>
            </div>
            <div>
              <Button
                label='Show Answer'
                mode='primary'
                onClick={handleShowAnswer}
              />
            </div>
            <StatusBar session={session} />
          </>
        )}
      </div>
    </div>
  );
};
