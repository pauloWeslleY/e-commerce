import { memo } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";

interface InputFooterProps {
   label: string;
   link: string;
   onClick: () => void;
}

const InputFooter = ({ label, link, onClick }: InputFooterProps) => {
   return (
      <Stack pt={6}>
         <Text align={"center"}>
            {label}{" "}
            <Box
               as={"a"}
               cursor={"pointer"}
               color={"blue.400"}
               onClick={onClick}
            >
               {link}
            </Box>
         </Text>
      </Stack>
   );
};

export default memo(InputFooter);
