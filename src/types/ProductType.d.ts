import { Timestamp } from "firebase/firestore";

type ProductsType = {
   id?: string;
   title?: string;
   description?: string;
   price?: string;
   category?: string;
   quantity?: number;
   createAt?: Timestamp;
   updateAt?: Timestamp;
};

export { ProductsType };
