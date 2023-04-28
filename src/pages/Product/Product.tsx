import { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import { AddProduct } from "./components/AddProduct/AddProduct";
import { Loading } from "../../components/Loading";

export function Product() {
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      setIsLoading(false);
   }, []);

   return <Dashboard>{isLoading ? <Loading /> : <AddProduct />}</Dashboard>;
}
