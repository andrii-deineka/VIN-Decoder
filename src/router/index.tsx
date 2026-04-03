import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Variables from '../pages/Variables';
import VariableDetail from '../pages/VariableDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/variables',
    element: <Variables />,
  },
  {
    path: '/variables/:id',
    element: <VariableDetail />,
  },
]);