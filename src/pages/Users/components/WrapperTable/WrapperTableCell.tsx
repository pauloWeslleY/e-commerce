import { ReactNode, memo } from "react";
import { Td, useColorModeValue } from "@chakra-ui/react";

function WrapperTableCell({ children }: { children: ReactNode }) {
   const color1 = useColorModeValue("gray.400", "gray.400");

   return (
      <Td
         display={{
            base: "table-cell",
            md: "none",
         }}
         sx={{
            "@media print": {
               display: "none",
            },
            textTransform: "uppercase",
            color: color1,
            fontSize: "xs",
            fontWeight: "bold",
            letterSpacing: "wider",
            fontFamily: "heading",
         }}
      >
         {children}
      </Td>
   );
}

export default memo(WrapperTableCell);
