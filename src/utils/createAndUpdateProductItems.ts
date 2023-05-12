import { Timestamp } from "firebase/firestore";
import { ProductsType } from "../types/ProductType";
import { currentDay } from "./convertTimestampToDayjs";

const createdAtTimestamp = Timestamp.fromDate(currentDay);
const updatedAtTimestamp = Timestamp.fromDate(currentDay);

export const createAndUpdateProductItems = ({
   title,
   description,
   price,
   category,
   quantity,
   createAt = createdAtTimestamp,
   updateAt = updatedAtTimestamp,
}: ProductsType) => {
   const createProdItems: ProductsType = {
      title,
      description,
      price,
      category,
      quantity,
      createAt,
   };

   const updateProdItems: ProductsType = {
      title,
      description,
      price,
      category,
      quantity,
      updateAt,
   };

   return {
      createProdItems,
      updateProdItems,
   };
};
