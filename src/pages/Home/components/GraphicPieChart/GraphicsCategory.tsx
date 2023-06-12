import { memo, useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useFetch } from '../../../../hooks/useFetch'

const GraphicsCategory = () => {
  const { product } = useFetch()

  const graphicProducts = useMemo(() => {
    const prod = product.map(product => {
      return {
        name: product.name.slice(0, 3),
        quantidade: Number(product.quantity),
        preço: product.price,
      }
    })

    return prod
  }, [product])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={graphicProducts}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" type="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantidade" fill="#8884d8" />
        <Bar dataKey="preço" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default memo(GraphicsCategory)
