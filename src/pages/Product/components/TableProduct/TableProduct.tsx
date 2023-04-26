import { ReactNode, memo } from "react";
import {
   Table,
   TableCaption,
   TableContainer,
   Tbody,
   Th,
   Thead,
   Tr,
} from "@chakra-ui/react";
import { useColors } from "../../../../hooks/useColors";

interface TableProductProps {
   children: ReactNode;
}

function TableProduct({ children }: TableProductProps) {
   const { THEME } = useColors();

   return (
      <TableContainer>
         <Table
            variant={"striped"}
            color={THEME.TABLE.TABLE_TEXT_COLORS}
            fontFamily={"Inter"}
         >
            <TableCaption fontFamily={"Poppins"}>
               Tabela de Produtos
            </TableCaption>
            <Thead>
               <Tr>
                  <Th>Nome</Th>
                  <Th>Descrição</Th>
                  <Th>Categoria</Th>
                  <Th isNumeric>Quantidade</Th>
                  <Th isNumeric>Preço</Th>
                  <Th></Th>
               </Tr>
            </Thead>
            <Tbody>{children}</Tbody>
         </Table>
      </TableContainer>
   );
}

export default memo(TableProduct);
