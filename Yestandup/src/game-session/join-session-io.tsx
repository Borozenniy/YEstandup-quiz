import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from '../components/button/button';
import './join-session-io.scss';
import { Table } from '../components/table/table';
import { GameTable } from '../components/table/game-table';
import { Settings } from '../components/settings/settings';

const socket = io('http://localhost:5000', { path: '/app/join/session' });

export const JoinSessionIo = () => {
  const { id } = useParams(); // ID сесії
  const { user } = useAuth0();
  const [isHost, setIsHost] = useState(false);
  const [quiz, setQuiz] = useState([]); // Квіз
  //const [participant, setParticipant] = useState(null);
  const [session, setSession] = useState(null);
  const [sessionStatus, setSessionStatus] = useState('');
  //const [participants, setParticipants] = useState([]); // Список учасників
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [hasSelectedParticipant, setHasSelectedParticipant] = useState(false);
  const [chosenQuestion, setChosenQuestion] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState('');
  const [activeQuestionAnswer, setActiveQuestionAnswer] = useState('');

  // Функція перевірки, чи всі учасники підключені
  const everyParticipantIsConnected = () => {
    return session?.participants.every(
      (participant) => participant.status === 'connected'
    );
  };
  console.log(sessionStatus);

  // Функція для початку гри
  const startGame = () => {
    socket.emit('startSession', {
      sessionId: id,
    });
    socket.on('sessionStarted', ({ session }) => {
      setSession(session);
      setSessionStatus('active');
    });
  };

  const joinSession = () => {
    if (selectedParticipant) {
      socket.emit('joinSession', {
        sessionId: id,
        participantName: selectedParticipant,
        userEmail: user?.email,
      });
      setHasSelectedParticipant(true);
    }
  };

  useEffect(() => {
    socket.emit('joinSession', {
      sessionId: id,
      participantName: selectedParticipant,
      userEmail: user?.email,
    });

    //socket.emit('getParticipants', { sessionId: id });
    //socket.emit('getSession', { sessionId: id });

    //socket.on('sessionJoined', ({ session }) => {
    //  setSession(session);
    //  setParticipants(session.participants);
    //  setQuiz(session.quiz.quiz);
    //});

    //socket.on('sessionUpdated', ({ session }) => {
    //  setSession(session);
    //  setParticipants(session.participants);
    //  setQuiz(session.quiz.quiz);
    //});

    socket.on('isHost', ({ isHost }) => setIsHost(isHost));
    //socket.emit('getParticipants', { sessionId: id });
    //socket.emit('getSession', { sessionId: id });

    socket.emit('getSession', { sessionId: id });
    socket.on('updateSession', ({ session }) => {
      setSession(session);
    });

    //socket.emit('getParticipants', { sessionId: id });
    //socket.on('updateParticipants', ({ participants, quizGame }) => {
    //  setParticipants([...participants]);
    //  setQuiz([...quizGame]);
    //});

    return () => {
      socket.off('isHost');
      socket.off('updateSession');
      //socket.off('sessionUpdated');
    };
  }, [id, user]);

  const submitAnswerOnActiveQuestion = () => {
    if (activeQuestionAnswer && selectedParticipant) {
      console.log('Submit answer');
      socket.emit('submitAnswer', {
        sessionId: id,
        participantName: selectedParticipant,
        answer: activeQuestionAnswer,
        questionId: session.activeQuestion[0]._id,
      });
    }
  };

  // Функція для вибору учасника і приєднання до сесії
  console.log(chosenQuestion);
  const chooseQuestion = (row, column) => {
    setChosenQuestion(session.quiz.quiz[row].columns[column]);
  };

  useEffect(() => {
    if (chosenQuestion) {
      console.log('Do some magic');
      socket.emit('chooseQuestion', {
        sessionId: id,
        questionId: chosenQuestion._id,
        question: chosenQuestion.question,
      });
    }
  }, [chosenQuestion]);

  console.log(session);

  if (isHost && session?.status === 'pending') {
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
            {quiz.length > 0 && <Table table={quiz} mode='host' />}
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

  if (isHost && session?.status === 'active') {
    return (
      <div className='session'>
        <div className='session__content'>
          {/*<Table table={session.quiz.quiz} mode='host' />*/}
          <GameTable quiz={session.quiz.quiz} chooseQuestion={chooseQuestion} />
        </div>
        <Settings participants={session.participants} />
      </div>
    );
  }

  if (hasSelectedParticipant && session.status === 'pending') {
    return (
      <div className='session'>
        <div className='seession__content'>
          <h2>You play for {selectedParticipant} team</h2>
          <div>
            <p>Wait till the host and another teams connect</p>
            <div>
              <p>
                {' '}
                Host status:{' '}
                {session.host.isHostConnected ? 'connected' : 'pending'}
              </p>
            </div>
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
            </ul>
          </div>
        </div>
      </div>
    );
  }

  /*
  if(session.activeQuestion[0]._id === )
  */

  if (hasSelectedParticipant && session.status === 'active') {
    return (
      <div className='session'>
        <div className='seession__content'>
          <div>
            <h2>You play for {selectedParticipant} team</h2>
          </div>
          <div>
            {session.activeQuestion.length > 0 ? (
              <div>
                <p>Current Question {session.host.name}</p>
                <p>{session.activeQuestion[0].question}</p>
              </div>
            ) : (
              <p>Wait till the host chooses a question</p>
            )}
          </div>
          <input
            type='text'
            value={activeQuestionAnswer}
            onChange={(e) => setActiveQuestionAnswer(e.target.value)}
          />
          <Button
            label='Submit Answer'
            mode='primary'
            onClick={submitAnswerOnActiveQuestion}
            disabled={!activeQuestionAnswer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='session'>
      <div className='session__content'>
        <h1>Join Quiz Session</h1>
        <p>Session ID: {id}</p>

        <div>
          <h3>Select a participant:</h3>
          <select
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
          >
            <option value='' disabled>
              Select participant
            </option>
            {session &&
              session.participants.map((participant) => (
                <option
                  key={participant._id}
                  value={participant.name}
                  disabled={participant.status === 'connected'}
                >
                  {participant.name} (Status: {participant.status})
                </option>
              ))}
          </select>

          <Button
            label='Join Session'
            mode='primary'
            onClick={joinSession}
            disabled={!selectedParticipant}
          />
        </div>
      </div>
    </div>
  );
};
