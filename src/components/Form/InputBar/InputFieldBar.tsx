import { ReactElement, memo } from "react";
import {
   FormControl,
   Input,
   InputGroup,
   InputLeftElement,
   InputProps,
} from "@chakra-ui/react";
import { FormLabelTitle } from "../FormLabelTitle";

interface InputFieldBarProps extends InputProps {
   label: string;
   title: string;
   icon?: ReactElement;
}

function InputFieldBar(props: InputFieldBarProps) {
   const { title, label, icon, ...rest } = props;

   return (
      <FormControl id={label} isRequired>
         <FormLabelTitle title={title} htmlFor={label} />
         <InputGroup>
            <InputLeftElement pointerEvents="none" children={icon} />
            <Input
               {...rest}
               id={label}
               type={label}
               name={label}
               autoComplete={label}
               placeholder="Digite seu email..."
               focusBorderColor={"purple.300"}
               _placeholder={{ opacity: 1, color: "whiteAlpha.500" }}
               fontFamily={"Poppins"}
            />
         </InputGroup>
      </FormControl>
   );
}

export default memo(InputFieldBar);
