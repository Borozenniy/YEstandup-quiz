import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const logOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <header className='header'>
        <div className='header__navigation'>
          <NavLink to={'/playquiz'}>Play Quiz</NavLink>
          <NavLink to={'/createquiz'}>Create Quiz</NavLink>
        </div>
        <div className='header__button'>
          {isLoggedIn && <button onClick={logOut}>Log out</button>}
        </div>
      </header>
    </>
  );
};
