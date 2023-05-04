import { memo, useContext } from "react";
import {
   Avatar,
   Box,
   Center,
   Flex,
   FlexProps,
   HStack,
   VStack,
   Text,
   Button,
   IconButton,
   Icon,
   Menu,
   MenuButton,
   MenuDivider,
   MenuItem,
   MenuList,
   useColorMode,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AuthenticationContext } from "../../../../contexts/authContextProvider";
import { useColors } from "../../../../hooks/useColors";
import { HiOutlineLogout } from "react-icons/hi";

interface MobileProps extends FlexProps {
   onOpen: () => void;
}

const DashboardMobileNav = ({ onOpen, ...rest }: MobileProps) => {
   const { colorMode, toggleColorMode } = useColorMode();
   const { THEME } = useColors();
   const { userOnAuth, handleLogout } = useContext(AuthenticationContext);

   return (
      <Flex
         as={"nav"}
         ml={{ base: 0, md: 60 }}
         px={{ base: 4, md: 4 }}
         height={"20"}
         align={"center"}
         justify={{ base: "space-between", md: "flex-end" }}
         gap={2}
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
            icon={<HamburgerIcon />}
         />

         <Text
            display={{ base: "flex", md: "none" }}
            fontSize={"2xl"}
            fontWeight={500}
         >
            SystemStock
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
            <Flex align={"center"}>
               <Menu>
                  <MenuButton
                     py={2}
                     px={2}
                     borderRadius={"md"}
                     transition={"all 0.3s"}
                     _focus={{ boxShadow: "none" }}
                     _hover={{ bg: "whiteAlpha.100" }}
                     _expanded={{ bg: "blackAlpha.600" }}
                  >
                     <HStack>
                        <Avatar size={"sm"} bg={"purple.300"} />
                        <VStack
                           display={{ base: "none", md: "flex" }}
                           alignItems={"flex-start"}
                           spacing={"1px"}
                           ml={"2"}
                        >
                           <Text fontSize={"sm"}>{userOnAuth.username}</Text>
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                           <FiChevronDown />
                        </Box>
                     </HStack>
                  </MenuButton>
                  <MenuList
                     bg={THEME.DASHBOARD.MENU_LIST_BG}
                     borderColor={THEME.DASHBOARD.MENU_LIST_BORDER_COLORS}
                     p={3}
                  >
                     <br />
                     <Center>
                        <Avatar size={"2xl"} bg={"purple.300"} />
                     </Center>
                     <br />

                     <Flex
                        flexDir={"column"}
                        justify={"center"}
                        align={"center"}
                        gap={3}
                     >
                        <Text
                           fontSize={"lg"}
                           fontFamily={"Inter"}
                           fontWeight={500}
                        >
                           {userOnAuth.username}
                        </Text>
                        <Text
                           fontSize={"md"}
                           fontFamily={"Inter"}
                           fontWeight={400}
                        >
                           {userOnAuth.email}
                        </Text>
                     </Flex>

                     <br />
                     <MenuDivider />
                     <MenuItem onClick={handleLogout}>
                        <Flex align={"center"} gap={3}>
                           <Icon as={HiOutlineLogout} boxSize={6} />
                           <span>Sair</span>
                        </Flex>
                     </MenuItem>
                  </MenuList>
               </Menu>
            </Flex>
         </HStack>
      </Flex>
   );
};

export default memo(DashboardMobileNav);
