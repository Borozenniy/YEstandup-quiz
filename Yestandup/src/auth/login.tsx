import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { router } from '../main.tsx';
import { ModalContext } from '../modal/modal-provider';
import { LoginButton } from '../components/login-button/login-button';
import { LogoutButton } from '../components/login-button/logout-button.tsx';
import { Button } from '../components/button/button';
//import { LoginPage } from '../components/pages/login';
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

export const Login = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();

  //const openLoginModal = () => {
  //  openModal(<LoginPage />);
  //};
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

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    router.navigate('/app');
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <div className='login'>
          <LoginButton />
        </div>
      </>
    );
  }
};
