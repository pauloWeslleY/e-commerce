import { memo, useEffect, useMemo, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { query, where, getDocs } from 'firebase/firestore'
import { prodCollectionRef } from '../../../../services/collections'
import { ProductsType } from '../../../../types/ProductType'

const GraphicsByProductQuantity = () => {
  const [filteredProduct, setFilteredProduct] = useState<ProductsType[]>([])

  const filteredByProduct = async () => {
    const filteredProductByQuantity = query(
      prodCollectionRef,
      where('quantity', '>=', 400)
    )
    const prodSnapshot = await getDocs(filteredProductByQuantity)
    const isProductByQuantity = prodSnapshot.docs.map<ProductsType>(doc => ({
      id: doc.id,
      ...doc.data(),
    }))

    setFilteredProduct(isProductByQuantity)
  }

  const graphicProducts = useMemo(() => {
    const prod = filteredProduct.map(props => {
      return {
        name: props.name,
        value: Number(props.quantity),
        price: Number(props.price),
      }
    })

    return prod
  }, [filteredProduct])

  useEffect(() => {
    filteredByProduct()
  }, [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={graphicProducts}
          cx="30%"
          cy="50%"
          outerRadius={80}
          fill="#6A64D9"
          label
        />
        <Pie
          dataKey="price"
          data={graphicProducts}
          cx={570}
          cy={150}
          innerRadius={40}
          outerRadius={80}
          fill="#10b981"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(GraphicsByProductQuantity)
