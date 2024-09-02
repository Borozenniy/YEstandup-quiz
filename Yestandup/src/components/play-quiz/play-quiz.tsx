import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { CreateSession } from '../../game-session/create-session/create-session';
import { JoinSession } from '../../game-session/join-session/join-session';
import { QuizSession } from '../../game-session/quiz-session/quiz-session.js';
import { QuizCard } from '../quiz-card/quiz-card';
import { SessionCard } from '../session-card/session-card';
import { Button } from '../button/button';

import { fetchQuizzes } from '../../services/api/quiz/quiz.js';
import './play-quiz.scss';

//const sessionId = '66d1d658f90e6a8b226fe9ff';
export const PlayQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [sessions, setSessions] = useState([]);
  console.log(sessions);

  //const fetchQuizzes = async () => {
  //  try {
  //    const response = await fetch(`http://localhost:5000/quiz/get-quizzes`, {
  //      method: 'GET',
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //    });

  //    if (!response.ok) {
  //      throw new Error('Network response was not ok');
  //    }

  //    const quizzes = await response.json();
  //    setQuizzes(quizzes);
  //  } catch (error) {
  //    throw new Error('Error with fetching quizzes:' + error);
  //  }
  //};

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

  useEffect(() => {
    const fetchAllSessions = async () => {
      const response = await fetch(
        `http://localhost:5000/session/get-sessions`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSessions(data);
    };

    fetchAllSessions();
  }, []);

  //useEffect(() => {
  //  const fetchAndSetSessions = async () => {
  //    try {
  //      const response = await fetch(
  //        `http://localhost:5000/session/get-sessions`,
  //        {
  //          method: 'GET',
  //          headers: {
  //            'Content-Type': 'application/json',
  //          },
  //        }
  //      );

  //      if (!response.ok) {
  //        throw new Error('Error with fetching sessions');
  //      }

  //      const data = await response.json();
  //      setSessions(data);
  //    } catch (error) {
  //      console.error('Error with fetching sessions');
  //    }
  //  };
  //  fetchAndSetSessions();
  //}, []);
  /*
useEffect(() => {
  const fetchAndSetSessions = async () => {
    try {
      const response = await fetch('http://localhost:5000/session/get-sessions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error with fetching sessions');
      }

      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error with fetching sessions:', error);
    }
  };
  fetchAndSetSessions();
}, []);
*/
  return (
    <div className='play-quiz'>
      <div className='play-quiz__board'>
        {/*<Button label='Get Quizzes' mode='primary' onClick={fetchQuizzes} />*/}
        <div className='play-quiz__navigation'>
          {/*<NavLink to='join'>Join a quiz</NavLink>
          <NavLink to='host'>Host a quiz</NavLink>*/}
          {/*<Button
            label='Search for a session'
            mode='primary'
            onClick={searchSession}
          />*/}
        </div>
        <div className='session-cards'>
          {sessions.length > 0 &&
            sessions.map((session) => (
              <SessionCard session={session} key={session._id} />
            ))}
        </div>

        <Outlet />
        {/*<CreateSession />
        <JoinSession />*/}
        {/*<QuizSession sessionId={sessionId} />*/}
      </div>
    </div>
  );
};
