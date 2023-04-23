import { ReactElement } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
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
      errorElement: <h2>Not Found</h2>,
      children: [
         {
            path: "/",
            element: <Home />,
         },
         {
            path: "/product",
            element: <Product />,
         },
      ],
   },
];

export const AppRoutes = createBrowserRouter(routes);
