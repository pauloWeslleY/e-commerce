import { IconType } from 'react-icons';
import { BiCategory, BiUser } from 'react-icons/bi';
import { MdProductionQuantityLimits } from 'react-icons/md';

interface CardsHomeProps {
   icon: IconType;
   title: string;
   subtitle: any;
   background: string;
}


export const CARDS_HOME_PROPS: Array<CardsHomeProps> = [
   {
      icon: MdProductionQuantityLimits,
      title: "Produtos Cadastrados",
      subtitle: "items.length",
      background: ""
   },
   {
      icon: BiCategory,
      title: "Categorias",
      subtitle: "",
      background: ""
   },
   {
      icon: BiUser,
      title: "Usuários",
      subtitle: "",
      background: ""
   },
]