import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { Button } from '../../components/button/button';
import './host-game-session.scss';

//const sessionSchema = new Schema({
//  quizId: { type: Schema.Types.ObjectId, ref: 'QuizTable', required: true },
//  quiz: { type: Schema.Types.ObjectId, ref: 'QuizTable' },
//  host: [hostSchema],
//  maxParticipants: { type: Number, required: false, default: 10 },
//  participants: [participantSchema],
//  status: {
//    type: String,
//    enum: ['pending', 'active', 'finished'],
//    default: 'pending',
//  },
//  qrCodeUrl: { type: String, required: true },
//});

export const HostGameSession = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { id } = useParams();
  //const [sessionInfo, setSessionInfo] = useState(null);
  const [hostInfo, setHostInfo] = useState({
    name: user?.name,
    email: user?.email,
  });
  const [participantsAmount, setParticipantsAmount] = useState(5);
  //const [sessionId, setSessionId] = useState('');
  const [participants, setParticipants] = useState(
    Array(participantsAmount).fill({ name: '', score: 0 })
  );

  const addParticipant = (index, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      name: value,
      score: 0,
    };
    setParticipants(updatedParticipants);
  };
  console.log(participants);

  const hasEveryTeamFilled = () => {
    if (participants.length === participantsAmount) {
      return participants.every((participant) => participant.name !== '');
    }
  };
  const locateToSession = (sessionId) => {
    navigate(`/app/session/${sessionId}`);
  };

  const addSessionToLocalStorage = (sessionId, host) => {
    //localStorage.setItem('sessionId', sessionId);
    //localStorage.setItem('host', host.email);
    locateToSession(sessionId);
  };

  const createGameSession = async () => {
    const response = await fetch(
      'http://localhost:5000/session/create-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: id,
          participants: participants,
          host: hostInfo,
        }),
      }
    );

    const data = await response.json();
    console.log(data);
    addSessionToLocalStorage(data.session._id, data.session.host);
    //setSessionId(data._id);

    //setSession(data);
  };

  useEffect(() => {
    if (participantsAmount < participants.length) {
      setParticipants(participants.slice(0, participantsAmount));
    } else if (participantsAmount > participants.length) {
      setParticipants([
        ...participants,
        ...Array(participantsAmount - participants.length).fill({
          name: '',
          score: 0,
        }),
      ]);
    }
  }, [participantsAmount]);

  const renderDivs = () => {
    return Array.from({ length: participantsAmount }, (_, index) => (
      <div
        key={index}
        style={{ padding: '10px', margin: '5px', backgroundColor: 'lightblue' }}
      >
        Team {index + 1}
        <input
          type='text'
          onChange={(e) => addParticipant(index, e.target.value)}
        />
      </div>
    ));
  };

  return (
    <div>
      <h1>Host Game Session</h1>
      <div>
        <div>
          <p>Amount of Teams</p>
          <input
            type='number'
            value={participantsAmount}
            min='1'
            max='10'
            onChange={(e) => setParticipantsAmount(Number(e.target.value))}
          />
        </div>
        {renderDivs()}
        <Button
          label='Create Game Session'
          mode='primary'
          onClick={createGameSession}
          disabled={!hasEveryTeamFilled()}
        />
      </div>
    </div>
  );
};
