import { useState, useEffect, useContext } from 'react';
import { SidebarContext } from '../sidebar/sidebar-provider';
import SettingsIcon from '../../assets/icons/settings.png';
import CheckIcon from '../../assets/icons/check.png';
import DisconnectIcon from '../../assets/icons/no-connection.png';
import PendingIcon from '../../assets/icons/time-left.png';
import './settings.scss';

export const Settings = ({ participants }) => {
  const [participantsConnected, setParticipantsConnected] =
    useState(participants);
  const { openSidebar } = useContext(SidebarContext);

  const participantStatus = (status) => {
    switch (status) {
      case 'connected':
        return (
          <>
            <img className='check__img' src={`${CheckIcon}`} alt='' />;
          </>
        );

      case 'disconnected':
        return <img className='check__img' src={`${DisconnectIcon}`} alt='' />;
      default:
        return (
          <>
            <img className='check__img' src={`${PendingIcon}`} alt='' />;
          </>
        );
    }
  };
  {
    /*<a href="https://www.flaticon.com/free-icons/clock" title="clock icons">Clock icons created by Freepik - Flaticon</a>*/
  }
  useEffect(() => {
    setParticipantsConnected(participants);
  }, [participants]);

  const showSettingsSidebar = () => {
    openSidebar(
      <div>
        <div>
          <h2>Settings</h2>
        </div>
        <div>
          <p>Participants:</p>
          {/*<ul>
            {participantsConnected.map((participant) => (
              <li key={participant._id}>
                <p>
                  {participant.name} - {participant.status}
                  {participant.status === 'connected' && (
                    <img className='check__img' src={`${CheckIcon}`} alt='' />
                  )}
                </p>
                <p>Score: {participant.score}</p>
              </li>
            ))}
          </ul>*/}
          <div className='participants-list'>
            {participantsConnected.map((participant) => (
              <div
                className='participants-list__participant'
                key={participant._id}
              >
                <p>
                  {participant.name} - {participant.status}
                  {participantStatus(participant.status)}
                  {/*{participant.status === 'connected' && (
                    <img className='check__img' src={`${CheckIcon}`} alt='' />
                  )}*/}
                </p>
                <p>Score: {participant.score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  //if (isOpen) {
  //  return (
  //    <div className='settings' onClick={() => setIsOpen(false)}>
  //      <div>
  //        <h1>Settings Open</h1>
  //      </div>
  //    </div>
  //  );
  //}

  return (
    <div className='settings' onClick={() => showSettingsSidebar()}>
      <img className='settings__img' src={`${SettingsIcon}`} alt='Settings' />
    </div>
  );
};
