import { Timestamp } from "firebase/firestore";
import { ProductsType } from "../types/ProductType";
import { currentDay } from "./convertTimestampToDayjs";

const createdAtTimestamp = Timestamp.fromDate(currentDay);
const updatedAtTimestamp = Timestamp.fromDate(currentDay);

export const createAndUpdateProduct = ({
   name,
   description,
   price,
   category,
   quantity,
   createAt = createdAtTimestamp,
   updateAt = updatedAtTimestamp,
}: ProductsType) => {
   const createProduct: ProductsType = {
      name,
      description,
      price,
      category,
      quantity,
      createAt,
   };

   const updateProduct: ProductsType = {
      name,
      description,
      price,
      category,
      quantity,
      updateAt,
   };

   return {
      createProduct,
      updateProduct,
   };
};
