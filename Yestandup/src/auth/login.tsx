import { useState, useEffect } from 'react';
import { Button } from '../components/button/button';
import './login.scss';
import { set } from 'mongoose';

//export const fetchUsers = async () => {
//  try {
//    const response = await.get('/users');
//    return response.data;
//  } catch (error) {
//    console.error('Error fetching users:', error);
//    throw error;
//  }
//};

export const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userData, setUserData] = useState({ name: 'no name' });
  const logIn = () => {
    //setIsLoggedIn(true);
    const user = { name: 'TESTNAME', password: '12345' };
    createUser(user);
  };

  const createUser = async (user) => {
    const response = await fetch(`http://localhost:5000/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    setUserData(user);
    return response.json();
  };

  useEffect(() => {
    //fetch('http://localhost:5000/users')
    //  .then((response) => response.json())
    //  .then((data) => console.log(data));
    ////console.log(data);
    async function fetchData() {
      const response = await fetch('http://localhost:5000/get-users');
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  }, []);

  const singUp = () => {};
  return (
    <>
      {!isLoggedIn && (
        <div className='login'>
          <Button mode='primary' label='Log In' onClick={logIn} />
          <Button label={userData.name} />
          <Button mode='primary' label='Sing up' onClick={singUp} />
        </div>
      )}
    </>
  );
};
