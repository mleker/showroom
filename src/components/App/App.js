import { createHashRouter, RouterProvider } from 'react-router-dom';
import { Main } from '../Main/Main';
import { Login } from '../Login/Login';
import { useToken } from './useToken';

export const App = () => {
  const {token, saveToken, removeToken} = useToken();

  const router = createHashRouter([
    {
      path: "/",
      element: <Main removeToken={removeToken}/>,
    },
  ]);

  if (!token) {
    return <Login saveToken={saveToken} />
  }

  return (
    <RouterProvider router={router} />
  );
};