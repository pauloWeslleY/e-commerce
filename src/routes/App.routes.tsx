import { ReactElement } from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { PrivateRoutes } from './Private.routes'
import { App } from '../App'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { Product } from '../pages/Product'
import { NotFound } from '../pages/404'
import { Categories } from '../pages/Categories'
import { Users } from '../pages/Users'
import { UserProfile } from '../pages/Profile'
import { Graphic } from '../pages/Graphic'
import { Login } from '../pages/SignIn/SignIn'

interface RoutesProps {
  path: string
  element: ReactElement
  children?: RouteObject[]
  errorElement: ReactElement
}

const routes: RoutesProps[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: <PrivateRoutes />,
        children: [
          {
            path: '/dashboard',
            element: <Home />,
          },
          {
            path: '/dashboard/product',
            element: <Product />,
          },
          {
            path: '/dashboard/categories',
            element: <Categories />,
          },
          {
            path: '/dashboard/graphics',
            element: <Graphic />,
          },
          {
            path: '/dashboard/users',
            element: <Users />,
          },
          {
            path: '/dashboard/profile',
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
]

export const AppRoutes = createBrowserRouter(routes)
