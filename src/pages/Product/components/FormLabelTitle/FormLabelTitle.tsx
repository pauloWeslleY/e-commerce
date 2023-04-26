import { memo } from "react";
import { FormLabel } from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

interface FormLabelTitleProps {
   htmlFor: string;
   title: string;
}

function FormLabelTitle(props: FormLabelTitleProps) {
   const { THEME } = useColors();
   const { title, htmlFor } = props;

   return (
      <FormLabel
         htmlFor={htmlFor}
         fontSize={"sm"}
         fontWeight={"md"}
         fontFamily={"Poppins"}
         color={THEME.DASHBOARD.FORM_LABEL_BACKGROUND}
      >
         {title}
      </FormLabel>
   );
}

export default memo(FormLabelTitle);
