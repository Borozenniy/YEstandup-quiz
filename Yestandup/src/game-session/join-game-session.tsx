import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/button/button';

export const JoinGameSession = () => {
  const [session, setSession] = useState([]);
  const [participantInfo, setParticipantInfo] = useState({
    index: '',
    name: '',
  });
  const { id } = useParams();
  console.log(participantInfo);
  const sessionId = id;

  //const saveParticipantTeam = async () => {
  //  const response = await fetch();
  //};

  const handleParticipantChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex].value;

    setParticipantInfo({
      index: selectedIndex,
      name: selectedOption,
    });
  };

  const refreshSession = async () => {
    const response = await fetch(
      `http://localhost:5000/session/get-session/${id}`
    );
    const data = await response.json();
    setSession(data.session);
  };

  const addParticipantInfoToLocalStorage = () => {
    //localStorage.setItem('sessionId', id);
    //localStorage.setItem('participant', participantInfo.name);
    //localStorage.setItem('participantIndex', participantInfo.index);
    console.log('Information saved to local storage');
    const add = localStorage;
    console.log(add);
    refreshSession();
  };

  const saveParticipantTeam = async () => {
    const response = await fetch(
      `http://localhost:5000/session/${id}/participant/${participantInfo.name}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus: 'connected', id, participantInfo }),
      }
    );
    const newData = await response.json();
    console.log(newData);
    addParticipantInfoToLocalStorage();
  };
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
  if (localStorage.participant && localStorage.participantIndex) {
    return (
      <div>
        <h1>U have already picked a team</h1>
        <div>
          <p>Team: {localStorage.participant}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Join Game Session</h1>
        <p>Session ID: {id}</p>
      </div>
      <div>
        {participantInfo?.name ? (
          <p>Team: {participantInfo.name}</p>
        ) : (
          <p>Choose a team</p>
        )}
        <select
          name='team'
          id='team'
          onChange={(e) => handleParticipantChange(e)}
        >
          {session?.participants &&
            session.participants.map((participant) => (
              <option
                key={participant._id}
                disabled={participant.status === 'connected'}
              >
                {participant.name}
              </option>
            ))}
        </select>
        <Button
          label='Save'
          mode='primary'
          onClick={saveParticipantTeam}
          disabled={!participantInfo?.name}
        />
      </div>
    </div>
  );
};
