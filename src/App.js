import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Main } from './components/Main/Main';
import { Login } from './components/Login/Login';
import { useTokenState } from './context';

export const App = () => {
  const { token } = useTokenState();

  const router = createHashRouter([
    {
      path: "/",
      element: <Main />,
    }
  ]);

  if (!token) return <Login />

  return <RouterProvider router={router} />
};