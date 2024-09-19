import { useState, useEffect } from 'react';
import { useSocket } from '../../socket/socket-provider';
import { Button } from '../../components/button/button';
import { Table } from '../../components/table/table';
import { GameTable } from '../../components/table/game-table';
import { Settings } from '../../components/settings/settings';

import './host-session.scss';

export const HostSession = ({ session }) => {
  const [chosenQuestion, setChosenQuestion] = useState(null);
  const { socket } = useSocket();
  const everyParticipantIsConnected = () => {
    return session?.participants.every(
      (participant) => participant.status === 'connected'
    );
  };

  const chooseQuestion = (row, column) => {
    setChosenQuestion(session.quiz.quiz[row].columns[column]);
  };
  /*
   const chooseQuestion = (question) => {
    socket.emit('chooseQuestion', question);
  };
  */

  const startGame = () => {
    if (socket) {
      socket.emit('startSession', {
        sessionId: id,
      });
      socket.on('sessionStarted', ({ session }) => {
        setSession(session);
        setSessionStatus('active');
      });
    }
  };

  useEffect(() => {
    // Логіка для хоста, наприклад, відстеження активного питання.
    socket.on('sessionUpdate', (newSession) => {
      // Оновлюємо стан, коли приходять зміни
    });

    return () => {
      socket.off('sessionUpdate');
    };
  }, [socket]);

  if (session.status === 'pending') {
    return (
      <div className='session'>
        <div className='session__content'>
          <h1>Host: {user.name}</h1>
          <div>
            <p>List of participants:</p>
            <ul>
              {session &&
                session.participants.map((participant) => (
                  <li
                    className={`${
                      participant.status === 'connected' ? 'connected' : ''
                    }`}
                    key={participant._id}
                  >
                    <b>{participant.name}</b> : {participant.status}
                  </li>
                ))}
              {/*{participants.map((participant) => (
                <li
                  className={`${
                    participant.status === 'connected' ? 'connected' : ''
                  }`}
                  key={participant._id}
                >
                  <b>{participant.name}</b> : {participant.status}
                </li>
              ))}*/}
            </ul>
            {session.quiz.quiz.length > 0 && (
              <Table table={session.quiz.quiz} mode='host' />
            )}
            <Button
              label='Start Game'
              mode='primary'
              onClick={startGame}
              disabled={!everyParticipantIsConnected()}
            />
          </div>
        </div>
      </div>
    );
  }

  if (session.status === 'active') {
    return (
      <div className='session'>
        <div className='session__content'>
          {/*<Table table={session.quiz.quiz} mode='host' />*/}
          <GameTable session={session} chooseQuestion={chooseQuestion} />
        </div>
        <Settings participants={session.participants} />
      </div>
    );
  }
};
