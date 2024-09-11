import { useState, useEffect, useContext } from 'react';
import { SidebarContext } from '../sidebar/sidebar-provider';
import SettingsIcon from '../../assets/icons/settings.png';
import CheckIcon from '../../assets/icons/check.png';
import './settings.scss';

export const Settings = ({ participants }) => {
  const [participantsConnected, setParticipantsConnected] =
    useState(participants);
  const { openSidebar } = useContext(SidebarContext);

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
          <p>Participants status:</p>
          <ul>
            {participantsConnected.map((participant) => (
              <li key={participant._id}>
                {participant.name} - {participant.status}
                {participant.status === 'connected' && (
                  <img className='check__img' src={`${CheckIcon}`} alt='' />
                )}
              </li>
            ))}
          </ul>
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
