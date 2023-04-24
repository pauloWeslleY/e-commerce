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
   useColorModeValue,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { AuthGoogleContext } from "../../../../contexts/authGoogle";

interface MobileProps extends FlexProps {
   onOpen: () => void;
}

const DashboardMobileNav = ({ onOpen, ...rest }: MobileProps) => {
   const { colorMode, toggleColorMode } = useColorMode();
   const { userAuth } = useContext(AuthGoogleContext);
   const userData = JSON.parse(userAuth);

   return (
      <Flex
         ml={{ base: 0, md: 60 }}
         px={{ base: 4, md: 4 }}
         height="20"
         alignItems="center"
         bg={useColorModeValue("white", "gray.900")}
         borderBottomWidth="1px"
         borderBottomColor={useColorModeValue("gray.200", "gray.700")}
         justifyContent={{ base: "space-between", md: "flex-end" }}
         {...rest}
      >
         <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
         />

         <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
         >
            Logo
         </Text>

         <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton
               size="lg"
               variant="ghost"
               aria-label="open menu"
               icon={<FiBell />}
            />
            <Button
               size="lg"
               variant="ghost"
               aria-label="open menu"
               onClick={toggleColorMode}
            >
               {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Flex alignItems={"center"}>
               <Menu>
                  <MenuButton
                     py={2}
                     transition="all 0.3s"
                     _focus={{ boxShadow: "none" }}
                  >
                     <HStack>
                        <Avatar
                           size={"sm"}
                           src={userData.photoURL}
                           name={userData.displayName}
                        />
                        <VStack
                           display={{ base: "none", md: "flex" }}
                           alignItems="flex-start"
                           spacing="1px"
                           ml="2"
                        >
                           <Text fontSize="sm">{userData.displayName}</Text>
                           <Text fontSize="xs" color="gray.600">
                              Admin
                           </Text>
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                           <FiChevronDown />
                        </Box>
                     </HStack>
                  </MenuButton>
                  <MenuList
                     bg={useColorModeValue("whiteAlpha.900", "gray.900")}
                     borderColor={useColorModeValue("gray.200", "gray.700")}
                  >
                     <br />
                     <Center>
                        <Avatar
                           size={"2xl"}
                           src={userData.photoURL}
                           name={userData.displayName}
                        />
                     </Center>
                     <br />
                     <Center>{userData.displayName}</Center>
                     <br />
                     <MenuDivider />
                     <MenuItem>Sign out</MenuItem>
                  </MenuList>
               </Menu>
            </Flex>
         </HStack>
      </Flex>
   );
};

export default memo(DashboardMobileNav);
