import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRoutes } from "./routes/App.routes.tsx";
import { THEME } from "./themes/themes.ts";
import "./services/firebase";

const elementRoot = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(elementRoot).render(
   <React.StrictMode>
      <ChakraProvider theme={THEME}>
         <RouterProvider router={AppRoutes} />
      </ChakraProvider>
   </React.StrictMode>
);
