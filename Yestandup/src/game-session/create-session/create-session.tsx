import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button } from '../../components/button/button';
import QRCode from 'react-qr-code';
import './create-session.scss';

const QR_CODE_URL =
  'data:image/png;base64,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';

export const CreateSession = () => {
  const [session, setSession] = useState(null);

  const { id } = useParams();
  console.log(id);

  const createGameSession = async (quizId) => {
    const response = await fetch(
      'http://localhost:5000/session/create-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizId: quizId }),
      }
    );

    const data = await response.json();
    setSession(data);
  };

  const getQuizById = async (id) => {
    const response = await fetch(`http://localhost:5000/quiz/get-quiz/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    //if (id) {
    //  createGameSession(id);
    //}
  }, [id]);

  return (
    <div className='session'>
      {/*<Button
        label='Create Quiz Session'
        mode='primary'
        onClick={createGameSession}
      />*/}
      <div className='session__content'>
        <Button
          label='Get Quiz By Id'
          mode='primary'
          onClick={() => getQuizById(id)}
        />
        {session && (
          <div>
            <h1>Session Created! Scan the QR Code to join</h1>
            <img src={QR_CODE_URL} alt='QR Code' />
            {/*<QRCode value={session.qrCodeUrl} />*/}
          </div>
        )}
      </div>
    </div>
  );
};
