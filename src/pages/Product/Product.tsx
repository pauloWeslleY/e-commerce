import { Dashboard } from "../Dashboard/Dashboard";
import { AddProduct } from "./components/AddProduct/AddProduct";
import { Loading } from "../../components/Loading";
import { useLoading } from "../../hooks/useLoading"

export function Product() {
   const { isLoading } = useLoading();

   return <Dashboard>{isLoading ? <Loading /> : <AddProduct />}</Dashboard>;
}
