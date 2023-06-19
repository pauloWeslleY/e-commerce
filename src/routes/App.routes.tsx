import { ReactElement } from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { App } from '../App'
import { PrivateRoutes } from './Private.routes'

import { Login } from '../pages/SignIn'
import { Register } from '../pages/Register/Register'
import { HomePage } from '../pages/Home'
import { Product } from '../pages/Product/Product'
import { NotFound } from '../pages/404/404'
import { Categories } from '../pages/Categories/Categories'
import { Users } from '../pages/Users'
import { UserProfile } from '../pages/Profile/UserProfile'
import { Graphic } from '../pages/Graphic/Graphic'
import { Email } from '../pages/Email/Email'

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
          {
            path: '/dashboard/email',
            element: <Email />,
          },
        ],
      },
    ],
  },
]

export const AppRoutes = createBrowserRouter(routes)
