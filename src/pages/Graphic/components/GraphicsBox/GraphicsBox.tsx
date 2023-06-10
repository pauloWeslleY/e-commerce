import { memo, useMemo } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useFetch } from '../../../../hooks/useFetch'

const GraphicsBox = () => {
  const { product } = useFetch()

  const graphicProducts = useMemo(() => {
    const prod = product.map(props => {
      return {
        name: props.name,
        value: Number(props.quantity),
        price: Number(props.price),
      }
    })

    return prod
  }, [product])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={graphicProducts}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Pie
          dataKey="price"
          data={graphicProducts}
          cx={500}
          cy={200}
          innerRadius={40}
          outerRadius={80}
          fill="#82ca9d"
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(GraphicsBox)
