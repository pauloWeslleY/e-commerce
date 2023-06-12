import { memo, useMemo } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useFetch } from '../../../../hooks/useFetch'

const ProductsGraphic = () => {
  const { product } = useFetch()

  const graphicProducts = useMemo(() => {
    const prod = product.map(props => {
      return {
        name: props.categoryId,
        quantidade: Number(props.quantity),
        preço: props.price,
      }
    })

    return prod
  }, [product])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
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
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="quantidade"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="preço"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default memo(ProductsGraphic)
