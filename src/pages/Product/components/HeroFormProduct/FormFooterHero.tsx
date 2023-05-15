import { Box } from "@chakra-ui/react";
import { memo } from "react";
import { IsButton } from "../../../../components/Buttons";
import { useColors } from "../../../../hooks/useColors";

interface FormFooterHeroProps {
   onHandleClick: () => void;
}

function FormFooterHero({ onHandleClick }: FormFooterHeroProps) {
   const { THEME } = useColors();

   return (
      <Box
         px={{
            base: 4,
            sm: 6,
         }}
         py={3}
         bg={THEME.DASHBOARD.FORM_FOOTER_BACKGROUND}
         textAlign={"right"}
      >
         <IsButton title="Criar" type="submit" onClick={onHandleClick} />
      </Box>
   );
}

export default memo(FormFooterHero);
