import { getDocs, query, where } from 'firebase/firestore'
import { prodCollectionRef } from '../services/collections'

export const filterProductsByCategory = async (id: string) => {
  const filteredProductsByCategory = query(
    prodCollectionRef,
    where('categoryId', '==', id)
  )

  const querySnapshot = await getDocs(filteredProductsByCategory)

  // Cria um array para armazenar os dados dos documentos
  const products: any[] = []

  // Itera sobre cada documento e adiciona os dados ao array
  for (const doc of querySnapshot.docs) {
    const dataProduct = doc.data()
    // Adiciona os dados e informações adicionais ao array de produtos
    products.push({ ...dataProduct })
  }

  // Retorna o array de produtos
  return products
}
