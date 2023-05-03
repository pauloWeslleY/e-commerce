import { Outlet } from "react-router-dom";
import { useLoggedUser } from "./hooks/useLoggedUser";

export function App() {
   const { isLoadingLoggedUser } = useLoggedUser();

   return !isLoadingLoggedUser && <Outlet />;
}
