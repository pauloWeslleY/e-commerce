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
import { ProductsType } from '../../../../types/ProductType'

interface ProductsGraphicProps {
  products: ProductsType[]
}

const ProductsGraphic = ({ products }: ProductsGraphicProps) => {
  const graphicProducts = useMemo(() => {
    const prod = products.map(props => {
      return {
        name: props.name.slice(0, 7),
        quantity: Number(props.quantity),
        price: Number(props.price),
      }
    })

    return prod
  }, [products])

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
          dataKey="quantity"
          name="Quantidade"
          stroke="#6A64D9"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="price"
          name="Preço"
          stroke="#10b981"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default memo(ProductsGraphic)
