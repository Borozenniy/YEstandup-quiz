import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/button/button';

export const JoinSession = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  console.log(id);

  const joinGameSession = async () => {
    const response = await fetch(`http://localhost:5000/session/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      console.log('Joined');
      //throw new Error('Network response was not ok');
    } else {
      console.log('Error joining to session');
    }
  };

  return (
    <div>
      <h1></h1>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        label='Join Quiz Session'
        mode='primary'
        onClick={joinGameSession}
        disabled={!name}
      />
    </div>
  );
};
