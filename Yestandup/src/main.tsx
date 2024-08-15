import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import App from './App.tsx';
import { Root } from './routes/root.tsx';
import { PlayQuiz } from './components/play-quiz/play-quiz.tsx';
import { CreateQuiz } from './components/create-quiz/create-quiz.tsx';
import './index.css';
//*
//import { useState } from 'react';
//import { Outlet } from 'react-router';
//import { Login } from '../auth/login';
//import { Header } from '../components/header/header';
////* do Fake Authentication
//import './root.scss';

//export const Root = () => {
//  const [isLoggedIn, setIsLoggedIn] = useState(false);

//  //useEffect(() => {
//  //  isLoggedIn && navigate('/login');
//  //}, [isLoggedIn, navigate]);

//  return (
//    <>
//      {isLoggedIn && (
//        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//      )}
//      <main>
//        <Outlet />
//      </main>
//      <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//    </>
//  );
//};

//*
//const AuthLayout = () => {};
const router = createBrowserRouter([
  {
    element: <Root />,
    path: '/',
    children: [
      {
        element: <PlayQuiz />,
        path: 'playquiz',
      },
      {
        element: <CreateQuiz />,
        path: 'createquiz',
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>{/*<App />*/}</RouterProvider>
  </React.StrictMode>
);
