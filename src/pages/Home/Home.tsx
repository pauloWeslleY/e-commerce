import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { BiCategory, BiHomeAlt2, BiUser } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useColors } from "../../hooks/useColors";
import { useFetch } from "../../hooks/useFetch";
import { CardStatistic } from "./components/CardStatistic";
import { TableListItems } from "./components/TableListItems";
import { SideBar } from "../../components/SideBar";
import { HeroTitleBar } from "../../components/HeroTitle";
import { useProduct } from "../../hooks/useProduct";
import { CardsHomeType } from "../../types/CardsHomeType";
import HeroPricing from "./components/HeroPricing/HeroPricing";

export function Home() {
   const { categories, users } = useFetch();
   const { product } = useProduct();
   const { THEME } = useColors();

   const CARDS_HOME_PROPS: Array<CardsHomeType> = [
      {
         icon: HiOutlineShoppingBag,
         title: "Produtos",
         subtitle: product.length,
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
         <HeroTitleBar label={"Home"} icon={BiHomeAlt2} />

         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={9}
            as={"section"}
            my={4}
         >
            {CARDS_HOME_PROPS.map((props, index) => (
               <GridItem key={`${props.icon}${index}`} colSpan={{ lg: 4 }}>
                  <Flex>
                     <CardStatistic cards={props} />
                  </Flex>
               </GridItem>
            ))}
         </Grid>

         <Grid
            templateColumns={{
               base: "repeat(1, 1fr)",
               lg: "repeat(12, 1fr)",
            }}
            gap={9}
            my={4}
         >
            <GridItem colSpan={{ lg: 12 }}>
               <HeroPricing />
            </GridItem>
         </Grid>

         <TableListItems />
      </SideBar>
   );
}
