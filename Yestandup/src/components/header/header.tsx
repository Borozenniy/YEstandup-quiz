import { NavLink } from 'react-router-dom';
import { Button } from '../button/button';
import './header.scss';

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const logOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <header className='header'>
        <div className='header__navigation'>
          <NavLink
            className={({ isActive, isPending }) =>
              isActive ? 'active' : isPending ? 'pending' : ''
            }
            to={'/playquiz'}
          >
            Play Quiz
          </NavLink>
          <NavLink to={'/createquiz'}>Create Quiz</NavLink>
        </div>
        <div className='header__button'>
          {isLoggedIn && (
            <Button label='Log out' mode='primary' onClick={logOut} />
          )}
        </div>
      </header>
    </>
  );
};
