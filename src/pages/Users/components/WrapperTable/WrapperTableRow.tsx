import { ReactNode, memo } from "react";
import { Tr } from "@chakra-ui/react";

function WrapperTableRow({ children }: { children: ReactNode }) {
   return (
      <Tr
         display={{
            base: "grid",
            md: "table-row",
         }}
         sx={{
            "@media print": {
               display: "table-row",
            },
            gridTemplateColumns: "minmax(0px, 35%) minmax(0px, 65%)",
            gridGap: "10px",
         }}
      >
         {children}
      </Tr>
   );
}

export default memo(WrapperTableRow);
