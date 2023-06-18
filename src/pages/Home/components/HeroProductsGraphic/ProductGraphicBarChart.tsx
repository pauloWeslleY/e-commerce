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

const ProductGraphicBarChart = () => {
  const { product } = useFetch()

  const graphicProducts = useMemo(() => {
    const prod = product.map(prod => {
      return {
        name: prod.name.slice(0, 3),
        uni: prod.quantity,
        preço: prod.price,
      }
    })

    return prod
  }, [product])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={150}
        height={40}
        data={graphicProducts}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="preço" fill="#10b981" />
        <Bar dataKey="uni" fill="#6A64D9" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default memo(ProductGraphicBarChart)
