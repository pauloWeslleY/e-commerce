import { ReactElement } from "react";
import { useProduct } from "../../../../../hooks/useProduct";
import { ModalHeroShowProducts } from "../../ModalHeroShowProducts";

export interface GetProductProps {
   title: string;
   label: number;
   element: ReactElement;
}

export function GetHandleProduct() {
   const {
      prodElectronics,
      prodOrchids,
      prodAutomotive,
      prodStationeryShop,
      prodTechnology,
   } = useProduct();

   const PRODUCT_PROPS: Array<GetProductProps> = [
      {
         title: "Eletrônicos",
         label: prodElectronics.length,
         element: (
            <ModalHeroShowProducts
               title="Eletrônicos"
               product={prodElectronics}
            />
         ),
      },
      {
         title: "Orquídeas",
         label: prodOrchids.length,
         element: (
            <ModalHeroShowProducts title="Orquídeas" product={prodOrchids} />
         ),
      },
      {
         title: "Automotivo",
         label: prodAutomotive.length,
         element: (
            <ModalHeroShowProducts
               title="Automotivo"
               product={prodAutomotive}
            />
         ),
      },
      {
         title: "Papelaria",
         label: prodStationeryShop.length,
         element: (
            <ModalHeroShowProducts
               title="Papelaria"
               product={prodStationeryShop}
            />
         ),
      },
      {
         title: "Tecnologia",
         label: prodTechnology.length,
         element: (
            <ModalHeroShowProducts
               title="Tecnologia"
               product={prodTechnology}
            />
         ),
      },
   ];

   return {
      PRODUCT_PROPS,
   };
}
