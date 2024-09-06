import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from '../components/button/button';

const socket = io('http://localhost:5000');

export const JoinSessionIo = () => {
  const { id } = useParams(); // ID сесії
  const [participants, setParticipants] = useState([]); // Список учасників
  const [selectedParticipant, setSelectedParticipant] = useState(''); // Вибраний учасник
  console.log(id);

  //useEffect(() => {
  //  if (participantName) {
  //    socket.emit('joinSession', { sessionId: id, participantName });

  //    socket.on('participantConnected', ({ participantName }) => {
  //      console.log(`${participantName} connected to session ${id}`);
  //    });

  //    socket.on('error', ({ message }) => {
  //      console.log(message);
  //    });

  //    //return () => {
  //    //  socket.disconnect();
  //    //};
  //    socket.on('updateParticipants', (participants) => {
  //      setParticipants(participants); // Оновлюємо список учасників
  //    });
  //  }
  //  //socket.emit('joinSession', { sessionId: id, participantName });

  //  //socket.on('participantJoined', ({ participant }) => {
  //  //  setParticipants((prev) => [...prev, participant]);
  //  //});

  //  //socket.on('answerSubmitted', ({ answer, participant }) => {
  //  //  console.log(answer, participant);
  //  //});
  //}, [id, participantName]);
  useEffect(() => {
    //if (participantName) {
    //  socket.emit('joinSession', { sessionId: id, participantName });

    //  socket.on('participantConnected', ({ participantName }) => {
    //    console.log(`${participantName} connected to session ${id}`);
    //  });

    //  socket.on('error', ({ message }) => {
    //    console.log(message);
    //  });

    //  socket.on('updateParticipants', (participants) => {
    //    setParticipants(participants); // Оновлюємо список учасників
    //  });

    //  // Обробка відключення
    //  return () => {
    //    socket.disconnect();
    //  };
    //}
    socket.emit('getParticipants', { sessionId: id });

    socket.on('updateParticipants', ({ participants }) => {
      console.log('Participants:', participants);
      setParticipants(participants); // Оновлюємо список учасників
    });

    socket.on('error', ({ message }) => {
      console.log(message);
    });

    // Відключення сокета при виході
    //return () => {
    //  socket.disconnect();
    //};
  }, [id]);

  const joinSession = () => {
    if (selectedParticipant) {
      socket.emit('joinSession', {
        sessionId: id,
        participantName: selectedParticipant,
      });
    }
  };

  //const submitAnswer = () => {
  //  socket.emit('submitAnswer', { answer: participantName });
  //};

  return (
    <div>
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
          {participants &&
            participants.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name} (Status: {p.status})
              </option>
            ))}
        </select>
      </div>

      <Button label='Join Session' mode='primary' onClick={joinSession} />
    </div>
  );
};

/*
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { Button } from '../components/button/button';

const socket = io('http://localhost:5000');

export const JoinSessionIo = () => {
  const { id } = useParams(); // ID сесії
  const [participants, setParticipants] = useState([]); // Список учасників
  const [selectedParticipant, setSelectedParticipant] = useState(''); // Вибраний учасник

  useEffect(() => {
    // Отримуємо учасників сесії при підключенні
    socket.emit('getParticipants', { sessionId: id });

    socket.on('updateParticipants', ({ participants }) => {
      console.log('Participants:', participants);
      setParticipants(participants); // Оновлюємо список учасників
    });

    socket.on('error', ({ message }) => {
      console.log(message);
    });

    // Відключення сокета при виході
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const joinSession = () => {
    if (selectedParticipant) {
      socket.emit('joinSession', {
        sessionId: id,
        participantName: selectedParticipant,
      });
    }
  };

  return (
    <div>
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
          {participants &&
            participants.map((p) => (
              <option key={p._id} value={p.name}>
                {p.name} (Status: {p.status})
              </option>
            ))}
        </select>
      </div>

      <Button label='Join Session' mode='primary' onClick={joinSession} />
    </div>
  );
};

*/
