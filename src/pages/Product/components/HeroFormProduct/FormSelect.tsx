import { FormControl, GridItem, Select, SelectProps } from "@chakra-ui/react";
import { FormLabelTitle } from "../../../../components/Form/FormLabelTitle";
import { useColors } from "../../../../hooks/useColors";
import { useFetch } from "../../../../hooks/useFetch";

interface SelectFormProps extends SelectProps {
   colSpan: any;
}

function SelectForm(props: SelectFormProps) {
   const { colSpan, ...rest } = props;
   const { isCategories } = useFetch();
   const { THEME } = useColors();

   return (
      <FormControl isRequired as={GridItem} colSpan={colSpan}>
         <FormLabelTitle title="Categorias" htmlFor="categories_product" />
         <Select
            {...rest}
            id="categories_product"
            name="categories_product"
            autoComplete="categories_product"
            placeholder="Selecione uma opção"
            mt={1}
            focusBorderColor={
               THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_FOCUS_COLORS
            }
            _placeholder={{
               opacity: 1,
               color: THEME.DASHBOARD.INPUT_BAR_PLACEHOLDER_COLORS,
            }}
            shadow={"sm"}
            size={"sm"}
            w={"full"}
            rounded={"md"}
         >
            {isCategories.map((props, i) => (
               <option key={i} value={props.title}>
                  {props.title}
               </option>
            ))}
         </Select>
      </FormControl>
   );
}

export default SelectForm;
