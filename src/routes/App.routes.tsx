import { ReactElement } from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { PrivateRoutes } from './Private.routes'

import { Register } from '../pages/Register'
import { HomePage } from '../pages/Home'
import { Product } from '../pages/Product'
import { NotFound } from '../pages/404'
import { Categories } from '../pages/Categories'
import { Users } from '../pages/Users'
import { UserProfile } from '../pages/Profile'
import { Graphic } from '../pages/Graphic'
import { SignIn } from '../pages/SignIn'

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
        element: <SignIn />,
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
            element: <HomePage />,
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
