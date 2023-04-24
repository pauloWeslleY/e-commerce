import { ReactElement } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { SignIn } from "../pages/SignIn/SignIn";
import { Register } from "../pages/Register/Register";
import PrivateRoutes from "./Private.routes";
import { Home } from "../pages/Home/Home";
import { Product } from "../pages/Product/Product";

interface RoutesProps {
   path: string;
   element: ReactElement;
   children?: RouteObject[];
   errorElement?: ReactElement;
}

const routes: RoutesProps[] = [
   {
      path: "/",
      element: <App />,
      errorElement: <h1>Not Found</h1>,
      children: [
         {
            path: "/",
            element: <SignIn />,
         },
         {
            path: "/register",
            element: <Register />,
         },
         {
            path: "/dashboard",
            element: <PrivateRoutes />,
            children: [
               {
                  path: "/dashboard",
                  element: <Home />,
               },
               {
                  path: "/dashboard/product",
                  element: <Product />,
               },
            ],
         },
      ],
   },
];

export const AppRoutes = createBrowserRouter(routes);
