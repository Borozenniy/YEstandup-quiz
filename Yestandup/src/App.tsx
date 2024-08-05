import { RouterProvider, createBrowserRouter } from 'react-router-dom';

//import { useState } from 'react'
//import reactLogo from './assets/react.svg';
//import viteLogo from '/vite.svg';
import './App.css';
import { Login } from './auth/login';

const router = createBrowserRouter([
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <App />,
    path: '/',
  },
]);

function App() {
  //const [count, setCount] = useState(0);

  return <></>;
}

export default App;
