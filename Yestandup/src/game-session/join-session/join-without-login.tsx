import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

import { SessionCard } from '../../components/session-card/session-card';

export const JoinWithoutLogin = () => {
  const [sessions, setSessions] = useState([]);
  const { user } = useAuth0();
  const navigate = useNavigate();
  //console.log(user);

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user]);

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
  if (!user) {
    return (
      <div>
        <h1>Join without login</h1>
        {sessions.length > 0 &&
          sessions.map((session) => (
            <SessionCard session={session} key={session._id} />
          ))}
      </div>
    );
  }
};
