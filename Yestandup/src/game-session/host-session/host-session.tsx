import { useState, useEffect } from 'react';
import { useParamns } from 'react-router-dom';
import { Button } from '../../components/button/button';

export const HostSession = ({ sessionId }) => {
  const [session, setSession] = useState(null);

  const endSession = async () => {
    const response = await fetch(
      `http://localhost:5000/session/${sessionId}/end`,
      {
        method: 'POST',
      }
    );

    if (response.ok) {
      console.log('Session ended');
    } else {
      throw new Error('Network response was not ok');
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(
        `http://localhost:5000/session/:${sessionId}`
      );

      const data = await response.json();
      setSession(data);
    };

    fetchSession();
  }, [sessionId]);
  return (
    <div>
      <div>
        <h1>Host Session</h1>
        {/*{session && <p>Session name: {session?.quiz.quizName}</p>}*/}
      </div>
      <div>
        {/*{session.participants.map((participant) => (
          <ul>
            <li key={participant._id}>
              {participant.name}: {participant.score} points
            </li>
          </ul>
        ))}*/}
      </div>
      <div>
        <Button label='End Session' mode='primary' onClick={endSession} />
      </div>
    </div>
  );
};
