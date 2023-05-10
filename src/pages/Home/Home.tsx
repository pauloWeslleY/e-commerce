import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineStoreMallDirectory } from "react-icons/md";
import { BiCategory, BiUser } from "react-icons/bi";
import { useColors } from "../../hooks/useColors";
import { useFetch } from "../../hooks/useFetch";

import { CardStatistic } from "./components/CardStatistic";
import { TableListItems } from "./components/TableListItems";
import { SideBar } from "../../components/SideBar";
import { HeroTitleBar } from "../../components/HeroTitle";
import { useProduct } from "../../hooks/useProduct";

interface CardsHomeProps {
   icon: IconType;
   title: string;
   subtitle: any;
   background: string;
}

export function Home() {
   const { categories, users } = useFetch();
   const { items } = useProduct();
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
      <SideBar>
         <HeroTitleBar label={"Dashboard"} icon={RxDashboard} />

         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={9}
            as={"section"}
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

         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={9}
         >
            <GridItem
               colSpan={{ lg: 12 }}
               bg={THEME.HOME.BACKGROUND}
               rounded={"md"}
               shadow={"lg"}
               h={"15rem"}
               p={5}
            >
               <h1>Section</h1>
            </GridItem>
         </Grid>
      </SideBar>
   );
}
