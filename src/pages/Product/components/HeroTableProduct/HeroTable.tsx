import { ReactNode, memo } from "react"
import { Table } from "@chakra-ui/react"

const HeroTable = ({children}: {children: ReactNode}) => {
  return (
    <Table
      my={4}
      w="full"
      bg="white"
      _dark={{ bg: "gray.800" }}
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
      {children}
    </Table>
  )
}

export default memo(HeroTable)