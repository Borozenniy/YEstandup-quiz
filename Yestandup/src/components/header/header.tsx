import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LogoutButton } from '../login-button/logout-button';
import { Button } from '../button/button';
import './header.scss';

export const Header = () => {
  const { user, isAuthenticated } = useAuth0();

  console.log(user);

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
