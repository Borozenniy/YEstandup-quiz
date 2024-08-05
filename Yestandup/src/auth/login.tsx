import './login.scss';

export const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const logIn = () => {
    setIsLoggedIn(true);
  };
  return (
    <>
      {!isLoggedIn && (
        <div className='login'>
          <button onClick={logIn}>Log in</button>
          <button>Sing up</button>
        </div>
      )}
    </>
  );
};
