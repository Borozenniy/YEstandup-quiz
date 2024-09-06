//import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import './session-card.scss';

export const SessionCard = ({ session, size = 'medium' }) => {
  const navigate = useNavigate();

  console.log(session);

  const joinToSession = () => {
    navigate(`/app/join/session/${session._id}`);
  };
  return (
    <div className='session-card'>
      <div className='session-card__label'>
        <p>Session ID: {session._id}</p>
        <p>Status: {session.status}</p>
      </div>
      <div className='session-card__qr-code'>
        <img className='' src={session.qrCodeUrl} alt='' />
      </div>
      {/*<Outlet />*/}
      <div className='session-card__button'>
        <Button label='Join to Quiz' mode='primary' onClick={joinToSession} />
      </div>
    </div>
  );
};
