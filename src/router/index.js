import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/views/Home';
import NotFound from '@/views/NotFound';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/demo/:id',
    // element: <Demo />,
    async lazy() {
      // loader结果返回，才会渲染组件
      const comp = await import('@/views/Demo');
      return { Component: comp.default, loader: comp.loader };
    },
  },
  {
    path: '/',
    element: <Navigate to={'/home'}/>,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;