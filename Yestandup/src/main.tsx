import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './auth/login.tsx';
import { Root } from './root/root.tsx';

import { PlayQuiz } from './components/play-quiz/play-quiz.tsx';
import { CreateQuiz } from './components/create-quiz/create-quiz.tsx';
import { HostQuiz } from './components/host/host-quiz.tsx';
import { JoinQuiz } from './components/join-quiz/join-quiz.tsx';
import { getConfig } from '../config.ts';
import './index.css';
import './styles/variable.scss';
//*
//import { useState } from 'react';
import { Outlet } from 'react-router';

import { GameSession } from './game-session/game-session.tsx';
import { CreateSession } from './game-session/create-session/create-session.tsx';
import { HostSession } from './game-session/host-session/host-session.tsx';
import { HostGameSession } from './game-session/ host-game-session/host-game-session.tsx';
import { JoinGameSession } from './game-session/join-game-session.tsx';
import { JoinSessionIo } from './game-session/join-session-io.tsx';
import { JoinWithoutLogin } from './game-session/join-session/join-without-login.tsx';
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

const { domain, clientId } = getConfig();
/*
 return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams='http://localhost:5173/app'
    >
      <main>
        <Outlet />
      </main>
    </Auth0Provider>
  );
*/

const Auth0ProviderLayout = () => {
  return (
    <Auth0Provider
      domain='dev-wi1dwf0z2pg8534i.us.auth0.com'
      clientId='jg0udrv3PJ0s7yMIEfJpUJymcjp2EoSK'
      authorizationParams={{
        redirect_uri: window.location.origin + '/app',
      }}
    >
      <JoinWithoutLogin />
      <Outlet />
    </Auth0Provider>
  );
};

/*

    {
        element: <PlayQuiz />,
        path: 'playquiz',
      },
      {
        element: <CreateQuiz />,
        path: 'createquiz',
      },
*/
/*
element: <Root />,
    path: '/',
    children: 
*/
export const router = createBrowserRouter([
  {
    element: <Auth0ProviderLayout />,
    path: '/',
    children: [
      {
        element: <Login />,
        path: 'login',
      },
      {
        element: <Login />,
        path: '',
      },
      {
        element: <Root />,
        path: 'app',
        children: [
          {
            element: <PlayQuiz />,
            path: 'playquiz',
            children: [
              { element: <PlayQuiz />, path: 'join' },
              {
                element: <HostQuiz />,
                path: 'host',
                children: [
                  {
                    element: <HostGameSession />,
                    path: ':id',
                  },
                  //{ element: <HostSession />, path: 'session/:id' },
                ],
              },
            ],
          },
          {
            element: <GameSession />,
            path: 'session/:id',
          },
          {
            element: <JoinSessionIo />,
            path: 'join/session/:id',
          },

          {
            element: <CreateQuiz />,
            path: 'createquiz',
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
