import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AuthenticationProvider } from "./contexts/authContextProvider.tsx";
import { AppRoutes } from "./routes/App.routes.tsx";
import { THEME } from "./themes/themes.ts";
import "./services/firebase";
import "./styles/global.css";

const elementRoot = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(elementRoot).render(
   <React.StrictMode>
      <ChakraProvider theme={THEME}>
         <ColorModeScript initialColorMode={THEME.config.initialColorMode} />
         <AuthenticationProvider>
            <RouterProvider router={AppRoutes} />
         </AuthenticationProvider>
      </ChakraProvider>
   </React.StrictMode>
);
