import { useState } from 'react';
import InforIcon from '../../assets/icons/information.png';
import WaitIcon from '../../assets/icons/wait.png';
import CheckIcon from '../../assets/icons/check.png';
import './status-bar.scss';

export const StatusBar = ({ session }) => {
  const [showStatusBar, setShowStatusBar] = useState(false);
  const hasParticipantAnswered = (currentParticipant: string) => {
    const user = session.participants.find(
      (participant) => participant.name === currentParticipant
    );
    if (user.answers.length > 0) {
      const answeredQuestion = user.answers.find(
        (answer) =>
          answer.questionId === session.activeQuestion[0]._id.toString()
      );
      console.log(answeredQuestion);
      //return answeredQuestions.every((answer) => answer === true);
      return (
        answeredQuestion?.questionId ===
        session.activeQuestion[0]._id.toString()
      );
    }
  };

  return (
    <div>
      {showStatusBar ? (
        <div className='status-bar'>
          <div className='status-bar__information'>
            <div>
              <p>Answers</p>
            </div>
            {session.participants.map((participant) => (
              <div className='status-bar__participant-information'>
                <p>{participant.name} </p>
                {hasParticipantAnswered(participant.name) ? (
                  <div>
                    <img
                      className='status-bar__answer-image'
                      src={`${CheckIcon}`}
                      alt='Info'
                    />
                  </div>
                ) : (
                  <img
                    className='status-bar__answer-image'
                    src={`${WaitIcon}`}
                    alt='Info'
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className='status-bar__close-button'
            onClick={() => setShowStatusBar(false)}
          >
            ×
          </div>
        </div>
      ) : (
        <div
          className='status-bar__icon'
          onClick={() => setShowStatusBar(true)}
        >
          <img className='status-bar__image' src={`${InforIcon}`} alt='Info' />
        </div>
      )}
    </div>
  );
};
