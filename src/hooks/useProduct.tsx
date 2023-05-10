import { useEffect, useState } from "react";
import { ProductsType } from "../types/ProductType";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../services/firebase";

export function useProduct() {
   const [items, setItems] = useState<ProductsType[]>([]);
   const [itemsElectronics, setItemsElectronics] = useState<ProductsType[]>([]);
   const [itemsOrchids, setItemsOrchids] = useState<ProductsType[]>([]);
   const [itemsAutomotive, setItemsAutomotive] = useState<ProductsType[]>([]);
   const [itemsStationeryShop, setItemsStationeryShop] = useState<
      ProductsType[]
   >([]);
   const [itemsTechnology, setItemsTechnology] = useState<ProductsType[]>([]);
   const itemsCollectionsRef = collection(db, "items");

   const filteredGetItems = async () => {
      // TODO: Pega todos os items da categoria Orchids
      const filteredItemsOrchids = query(
         itemsCollectionsRef,
         where("category", "==", "Orquídeas"),
         orderBy("title")
      );
      const querySnapshotItemsOrchids = await getDocs(filteredItemsOrchids);
      const itemsOrchidsData = querySnapshotItemsOrchids.docs.map<ProductsType>(
         (doc) => ({
            id: doc.id,
            ...doc.data(),
         })
      );

      // TODO: Pega todos os items da categoria Technology
      const filteredItemsTechnology = query(
         itemsCollectionsRef,
         where("category", "==", "Tecnologia"),
         orderBy("title")
      );
      const querySnapshotItemsTechnology = await getDocs(
         filteredItemsTechnology
      );
      const itemsTechnologyData =
         querySnapshotItemsTechnology.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

      // TODO: Pega todos os items da categoria StationeryShop
      const filteredItemsStationeryShop = query(
         itemsCollectionsRef,
         where("category", "==", "Papelaria"),
         orderBy("title")
      );
      const querySnapshotItemsStationeryShop = await getDocs(
         filteredItemsStationeryShop
      );
      const itemsStationeryShopData =
         querySnapshotItemsStationeryShop.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

      // TODO: Pega todos os items da categoria Electronics
      const filteredItemsElectronics = query(
         itemsCollectionsRef,
         where("category", "==", "Electronics"),
         orderBy("title")
      );
      const querySnapshotItems = await getDocs(filteredItemsElectronics);
      const itemsElectronicsData = querySnapshotItems.docs.map<ProductsType>(
         (doc) => ({
            id: doc.id,
            ...doc.data(),
         })
      );

      // TODO: Pega todos os items da categoria Automotive
      const filteredItemsAutomotive = query(
         itemsCollectionsRef,
         where("category", "==", "Automotivo"),
         orderBy("title")
      );
      const querySnapshotItemsAutomotive = await getDocs(
         filteredItemsAutomotive
      );
      const itemsAutomotiveData =
         querySnapshotItemsAutomotive.docs.map<ProductsType>((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));

      // TODO: Pega todos os items da Coleção
      const filteredItems = query(
         itemsCollectionsRef,
         where("title", "!=", true)
      );
      const querySnapshot = await getDocs(filteredItems);
      const itemsData = querySnapshot.docs.map<ProductsType>((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      setItemsTechnology(itemsTechnologyData);
      setItemsStationeryShop(itemsStationeryShopData);
      setItemsAutomotive(itemsAutomotiveData);
      setItemsElectronics(itemsElectronicsData);
      setItemsOrchids(itemsOrchidsData);
      setItems(itemsData);
   };

   useEffect(() => {
      filteredGetItems();
   }, []);

   return {
      items,
      itemsElectronics,
      itemsOrchids,
      itemsAutomotive,
      itemsStationeryShop,
      itemsTechnology,
   };
}
