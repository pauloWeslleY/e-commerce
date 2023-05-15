import { ChangeEventHandler, memo } from "react";
import { InputProps, SimpleGrid } from "@chakra-ui/react";
import { FormInputField, FormSelect } from "./index";

interface HeroFormProductProps extends InputProps {
   valueName?: string;
   onHandleChangeName: ChangeEventHandler<HTMLInputElement>;
   valuePrice?: string;
   onHandleChangePrice: ChangeEventHandler<HTMLInputElement>;
   valueDescription?: string;
   onHandleChangeDescription: ChangeEventHandler<HTMLInputElement>;
   valueQuantity?: number;
   onHandleChangeQuantity: ChangeEventHandler<HTMLInputElement>;
   valueCategoryId?: string;
   onHandleChangeCategoryId: ChangeEventHandler<HTMLSelectElement>;
}

function FormHeroProduct(props: HeroFormProductProps) {
   const {
      valueName,
      valuePrice,
      valueDescription,
      valueQuantity,
      valueCategoryId,
      onHandleChangeName,
      onHandleChangePrice,
      onHandleChangeDescription,
      onHandleChangeQuantity,
      onHandleChangeCategoryId,
   } = props;

   return (
      <SimpleGrid columns={6} spacing={6}>
         <FormInputField
            title="Nome do Produto"
            label="name_product"
            type="text"
            colSpan={[6, 3]}
            placeholder="Digite o nome do produto"
            value={valueName}
            onChange={onHandleChangeName}
         />

         <FormInputField
            title="Descrição do Produto"
            label="description_product"
            type="text"
            colSpan={[6, 3]}
            placeholder="Digite a descrição do produto"
            value={valueDescription}
            onChange={onHandleChangeDescription}
         />

         <FormInputField
            title="Preço do Produto"
            label="price_product"
            type="text"
            colSpan={[6, 3]}
            placeholder="Digite o preço do produto"
            value={valuePrice}
            onChange={onHandleChangePrice}
         />

         <FormInputField
            title="Quantidade do Produto"
            label="quantity_product"
            type="number"
            colSpan={[6, 3]}
            placeholder="Digite a quantidade do produto"
            value={valueQuantity}
            onChange={onHandleChangeQuantity}
         />

         <FormSelect
            colSpan={[6, 2]}
            value={valueCategoryId}
            onChange={onHandleChangeCategoryId}
         />
      </SimpleGrid>
   );
}

export default memo(FormHeroProduct);
