import { memo, useMemo } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useFetch } from '../../../../hooks/useFetch'

const ProductsGraphicPieChart = () => {
  const { product, isCategories } = useFetch()

  const graphicProducts = useMemo(() => {
    const prod = product.map(props => {
      return {
        name: props.name,
        value: Number(props.quantity),
      }
    })

    return prod
  }, [product])

  const graphicCategories = useMemo(() => {
    const categories = isCategories.map(props => {
      const prod = product.filter(item => item.categoryId === props.name)

      return {
        name: props.name,
        value: prod.length,
      }
    })

    return categories
  }, [isCategories, product])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={730} height={250}>
        <Pie
          data={graphicCategories}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#6A64D9"
        />
        <Pie
          data={graphicProducts}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#10b981"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(ProductsGraphicPieChart)
