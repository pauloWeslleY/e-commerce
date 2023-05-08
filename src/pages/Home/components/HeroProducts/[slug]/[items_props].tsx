import { ModalHeroShowProducts } from "../index";
import { useProduct } from "../../../../../hooks/useProduct";

export function ItemsProps() {
   const {
      itemsElectronics,
      itemsOrchids,
      itemsAutomotive,
      itemsStationeryShop,
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
   ];

   return {
      ITEMS_PROPS,
   };
}
