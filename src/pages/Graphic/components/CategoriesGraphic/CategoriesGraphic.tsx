import { memo, useMemo } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useFetch } from '../../../../hooks/useFetch'

const CategoriesGraphic = () => {
  const { product, isCategories } = useFetch()

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
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={graphicCategories}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(CategoriesGraphic)
