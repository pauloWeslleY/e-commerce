import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { BiCategory, BiUser } from "react-icons/bi";
import { IconType } from "react-icons";
import { useColors } from "../../hooks/useColors";
import { useFetch } from "../../hooks/useFetch";

import { Dashboard } from "../Dashboard/Dashboard";
import { CardStatistic } from "./components/CardStatistic";
import { TableListItems } from "./components/TableListItems";
import { RiHome2Fill } from "react-icons/ri";
import { NavTitle } from "../../components/NavBar";

interface CardsHomeProps {
   icon: IconType;
   title: string;
   subtitle: any;
   background: string;
}

export function Home() {
   const { items, categories, users } = useFetch();
   const { THEME } = useColors();

   const CARDS_HOME_PROPS: Array<CardsHomeProps> = [
      {
         icon: MdOutlineStoreMallDirectory,
         title: "Produtos ",
         subtitle: items.length,
         background: THEME.HOME.CARDS_STATISTIC_BG_PROD,
      },
      {
         icon: BiCategory,
         title: "Categorias",
         subtitle: categories.length,
         background: THEME.HOME.CARDS_STATISTIC_BG_CATE,
      },
      {
         icon: BiUser,
         title: "Usuários",
         subtitle: users.length,
         background: THEME.HOME.CARDS_STATISTIC_BG_USERS,
      },
   ];

   return (
      <Dashboard>
         <Box px={4} py={4}>
            <Flex h={16}>
               <NavTitle label={"Home"} icon={RiHome2Fill} />
            </Flex>
         </Box>

         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={10}
         >
            {CARDS_HOME_PROPS.map((props, index) => (
               <GridItem key={`${props.icon}${index}`} colSpan={{ lg: 4 }}>
                  <Flex>
                     <CardStatistic
                        icon={props.icon}
                        title={props.title}
                        subtitle={props.subtitle}
                        background={props.background}
                     />
                  </Flex>
               </GridItem>
            ))}
         </Grid>

         <TableListItems />
      </Dashboard>
   );
}
