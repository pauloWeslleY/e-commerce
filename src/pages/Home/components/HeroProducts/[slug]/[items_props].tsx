import { useProduct } from "../../../../../hooks/useProduct";
import { ModalHeroShowProducts } from "../../ModalHeroShowProducts";

export function ItemsProps() {
   const {
      itemsElectronics,
      itemsOrchids,
      itemsAutomotive,
      itemsStationeryShop,
      itemsTechnology,
   } = useProduct();

   const ITEMS_PROPS = [
      {
         title: "Eletrônicos",
         label: itemsElectronics.length,
         element: (
            <ModalHeroShowProducts
               title="Eletrônicos"
               items={itemsElectronics}
            />
         ),
      },
      {
         title: "Orquídeas",
         label: itemsOrchids.length,
         element: (
            <ModalHeroShowProducts title="Orquídeas" items={itemsOrchids} />
         ),
      },
      {
         title: "Automotivo",
         label: itemsAutomotive.length,
         element: (
            <ModalHeroShowProducts title="Automotivo" items={itemsAutomotive} />
         ),
      },
      {
         title: "Papelaria",
         label: itemsStationeryShop.length,
         element: (
            <ModalHeroShowProducts
               title="Papelaria"
               items={itemsStationeryShop}
            />
         ),
      },
      {
         title: "Tecnologia",
         label: itemsTechnology.length,
         element: (
            <ModalHeroShowProducts title="Tecnologia" items={itemsTechnology} />
         ),
      },
   ];

   return {
      ITEMS_PROPS,
   };
}
