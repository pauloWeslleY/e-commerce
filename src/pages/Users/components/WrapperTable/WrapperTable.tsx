import { ReactNode, memo } from "react";
import { Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";

function WrapperTable({ children }: { children: ReactNode }) {
   const HEADER = ["ID", "Nome", "Email", "ações"];

   return (
      <Table
         w="full"
         my={5}
         bg="whiteAlpha.800"
         _dark={{ bg: "gray.500" }}
         display={{
            base: "block",
            md: "table",
         }}
         sx={{
            "@media print": {
               display: "table",
            },
         }}
      >
         <Thead
            display={{
               base: "none",
               md: "table-header-group",
            }}
            sx={{
               "@media print": {
                  display: "table-header-group",
               },
            }}
         >
            <Tr>
               {HEADER.map((props) => (
                  <Th key={props} color={"purple.100"}>
                     {props}
                  </Th>
               ))}
            </Tr>
         </Thead>
         <Tbody
            display={{
               base: "block",
               lg: "table-row-group",
            }}
            sx={{
               "@media print": {
                  display: "table-row-group",
               },
            }}
         >
            {children}
         </Tbody>
      </Table>
   );
}

export default memo(WrapperTable);
