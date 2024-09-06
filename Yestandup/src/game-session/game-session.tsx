import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export const GameSession = () => {
  const [session, setSession] = useState([]);
  const { id } = useParams();
  console.log(id);
  console.log(session);

  useEffect(() => {
    const fetchSession = async () => {
      const response = await fetch(
        `http://localhost:5000/session/get-session/${id}`
      );
      const data = await response.json();
      setSession(data.session);
    };
    fetchSession();
  }, [id]);

  return (
    <div>
      <div>
        <h1>Game Session ID: {id}</h1>
      </div>
      <div>
        <p>Teams</p>
        {session?.participants &&
          session.participants.map((participant) => (
            <p key={participant._id}>{participant.name}</p>
          ))}
      </div>
    </div>
  );
};
