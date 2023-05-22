import { useEffect, useState } from 'react'
import { ProductsType } from '../types/ProductType'
import { getDocs, orderBy, query, where } from 'firebase/firestore'
import { prodCollectionRef } from '../services/collections'

export function useProduct() {
  const [product, setProduct] = useState<ProductsType[]>([])
  const [prodOrchids, setProductOrchids] = useState<ProductsType[]>([])
  const [prodAutomotive, setProductAutomotive] = useState<ProductsType[]>([])
  const [prodTechnology, setProductTechnology] = useState<ProductsType[]>([])
  const [prodStationeryShop, setProductStationeryShop] = useState<
    ProductsType[]
  >([])
  const [prodElectronics, setProductElectronics] = useState<ProductsType[]>([])

  const filteredProducts = async () => {
    //? NOTE: Pega todos os items da categoria Orchids
    const filteredProd = query(
      prodCollectionRef,
      where('category', '==', 'prodCategory'),
      orderBy('name')
    )
    const querySnapshotProduct = await getDocs(filteredProd)
    const productData = querySnapshotProduct.docs.map<ProductsType>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    //? NOTE: Pega todos os items da categoria Technology
    const filteredItemsTechnology = query(
      prodCollectionRef,
      where('category', '==', 'Tecnologia'),
      orderBy('name')
    )
    const querySnapshotItemsTechnology = await getDocs(filteredItemsTechnology)
    const itemsTechnologyData =
      querySnapshotItemsTechnology.docs.map<ProductsType>((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

    //? NOTE: Pega todos os items da categoria StationeryShop
    const filteredItemsStationeryShop = query(
      prodCollectionRef,
      where('category', '==', 'Papelaria'),
      orderBy('name')
    )
    const querySnapshotItemsStationeryShop = await getDocs(
      filteredItemsStationeryShop
    )
    const itemsStationeryShopData =
      querySnapshotItemsStationeryShop.docs.map<ProductsType>((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

    //? NOTE: Pega todos os items da categoria Electronics
    const filteredItemsElectronics = query(
      prodCollectionRef,
      where('category', '==', 'Eletrônicos'),
      orderBy('name')
    )
    const querySnapshotItems = await getDocs(filteredItemsElectronics)
    const itemsElectronicsData = querySnapshotItems.docs.map<ProductsType>(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    )

    //? NOTE: Pega todos os items da categoria Automotive
    const filteredItemsAutomotive = query(
      prodCollectionRef,
      where('category', '==', 'Automotivo'),
      orderBy('name')
    )
    const querySnapshotItemsAutomotive = await getDocs(filteredItemsAutomotive)
    const itemsAutomotiveData =
      querySnapshotItemsAutomotive.docs.map<ProductsType>((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

    //? NOTE: Pega todos os items da Coleção
    const filteredItems = query(prodCollectionRef, where('name', '!=', true))
    const querySnapshot = await getDocs(filteredItems)
    const itemsData = querySnapshot.docs.map<ProductsType>((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setProductTechnology(itemsTechnologyData)
    setProductStationeryShop(itemsStationeryShopData)
    setProductAutomotive(itemsAutomotiveData)
    setProductElectronics(itemsElectronicsData)
    setProductOrchids(productData)
    setProduct(itemsData)
  }

  useEffect(() => {
    filteredProducts()
  }, [])

  return {
    product,
    prodElectronics,
    prodOrchids,
    prodAutomotive,
    prodStationeryShop,
    prodTechnology,
  }
}
