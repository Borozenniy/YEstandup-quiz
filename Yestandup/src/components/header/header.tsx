import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { LogoutButton } from '../login-button/logout-button';
import { Button } from '../button/button';
import './header.scss';

export const Header = () => {
  const { user, isAuthenticated } = useAuth0();
  const localeStorage = window.localStorage;
  const navigate = useNavigate();
  const hasSession =
    localeStorage?.sessionId && user?.email === localeStorage.host;
  //const [localeStorage, setLocaleStorage] = useState(null);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useEffect(() => {
  //  isLoggedIn && navigate('/login');
  //}, [isLoggedIn, navigate]);
  const connectToQuiz = () => {
    navigate(`/app/session/${localStorage.sessionId}`);
  };

  //useEffect(() => {
  //  //console.log(localeStorage.sessionId);
  //  //console.log(localeStorage.host);
  //  //console.log(user);
  //  if (localeStorage?.sessionId) {
  //    localStorage?.host === user?.email &&
  //      navigate(`/app/session/${localStorage.sessionId}`);
  //  }
  //}, []);

  if (isAuthenticated) {
    return (
      <>
        <header className='header'>
          <div className='header__navigation'>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? 'active' : isPending ? 'pending' : ''
              }
              to={'/app/playquiz'}
            >
              Play Quiz
            </NavLink>
            <NavLink to={'/app/createquiz'}>Create Quiz</NavLink>
          </div>
          <div className='header__profile'>
            {hasSession && (
              <Button
                label='Connect to Quiz'
                mode='primary'
                onClick={connectToQuiz}
              />
            )}
            <div className='header__profile-image'>
              <img src={user?.picture} alt='user avatar' />
            </div>
            <div className='header__button'>
              <LogoutButton />
              {/*{isLoggedIn && (
              <Button label='Log out' mode='primary' onClick={logOut} />
            )}*/}
            </div>
          </div>
        </header>
      </>
    );
  }
};
