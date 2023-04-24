import { NavBar } from "../../components/NavBar/NavBar";
import { Dashboard } from "../Dashboard/Dashboard";
import { AddProduct } from "./components/AddProduct/AddProduct";

export function Product() {
   return (
      <Dashboard>
         <NavBar />

         <AddProduct />
      </Dashboard>
   );
}
