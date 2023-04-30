import { memo, useContext } from "react";
import {
   Avatar,
   Box,
   Button,
   Center,
   Flex,
   FlexProps,
   HStack,
   IconButton,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   Text,
   VStack,
   useColorMode,
} from "@chakra-ui/react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AuthenticationContext } from "../../../../contexts/authContextProvider";
import { useColors } from "../../../../hooks/useColors";

interface MobileProps extends FlexProps {
   onOpen: () => void;
}

const DashboardMobileNav = ({ onOpen, ...rest }: MobileProps) => {
   const { colorMode, toggleColorMode } = useColorMode();
   const { THEME } = useColors();
   const { userAuth, signOut, userSigned } = useContext(AuthenticationContext);
   const userData = JSON.parse(userAuth as string);

   console.log("result userData", userData);
   console.log("result userSigned", userSigned);

   return (
      <Flex
         as={"nav"}
         ml={{ base: 0, md: 60 }}
         px={{ base: 4, md: 4 }}
         height={"20"}
         align={"center"}
         justify={{ base: "space-between", md: "flex-end" }}
         bg={THEME.DASHBOARD.MOBILE_NAV_BG}
         borderBottomColor={THEME.DASHBOARD.BORDER_COLOR_MOBILE_BG}
         borderBottomWidth={"1px"}
         {...rest}
      >
         <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant={"outline"}
            aria-label="open menu"
            icon={<FiMenu />}
         />

         <Text
            display={{ base: "flex", md: "none" }}
            fontSize={"2xl"}
            fontWeight={500}
         >
            Dashboard
         </Text>

         <HStack spacing={{ base: "0", md: "6" }}>
            <Button
               size={"lg"}
               variant={"ghost"}
               aria-label="open menu"
               onClick={toggleColorMode}
            >
               {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Flex alignItems={"center"}>
               <Menu>
                  <MenuButton
                     py={2}
                     transition={"all 0.3s"}
                     _focus={{ boxShadow: "none" }}
                  >
                     <HStack>
                        <Avatar
                           size={"sm"}
                           src={"null"}
                           name={userSigned.username || "null"}
                        />
                        <VStack
                           display={{ base: "none", md: "flex" }}
                           alignItems={"flex-start"}
                           spacing={"1px"}
                           ml={"2"}
                        >
                           <Text fontSize={"sm"}>
                              {userSigned.username || "null"}
                           </Text>
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                           <FiChevronDown />
                        </Box>
                     </HStack>
                  </MenuButton>
                  <MenuList
                     bg={THEME.DASHBOARD.MENU_LIST_BG}
                     borderColor={THEME.DASHBOARD.MENU_LIST_BORDER_COLORS}
                  >
                     <br />
                     <Center>
                        <Avatar size={"2xl"} src={""} name={""} />
                     </Center>
                     <br />
                     <Center>
                        <Text
                           fontSize={"lg"}
                           fontFamily={"Inter"}
                           fontWeight={500}
                        >
                           {"null"}
                        </Text>
                     </Center>
                     <br />
                     <MenuDivider />
                     <MenuItem onClick={() => signOut()}>Sair</MenuItem>
                  </MenuList>
               </Menu>
            </Flex>
         </HStack>
      </Flex>
   );
};

export default memo(DashboardMobileNav);
