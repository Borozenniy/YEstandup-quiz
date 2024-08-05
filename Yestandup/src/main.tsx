import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import { PlayQuiz } from './components/play-quiz/play-quiz.tsx';
import { Root } from './routes/root.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    element: <Root />,
    path: '/',
  },
  {
    element: <PlayQuiz />,
    path: 'playquiz',
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}>{/*<App />*/}</RouterProvider>
  </React.StrictMode>
);
