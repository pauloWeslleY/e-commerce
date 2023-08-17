import { memo, useMemo } from 'react'
import { Label, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useFetch } from '../../../../hooks/useFetch'

const CategoriesGraphic = () => {
  const { product, isCategories } = useFetch()

  const graphicCategories = useMemo(() => {
    const categories = isCategories.map(props => {
      const prod = product.filter(item => item.categoryId === props.name)

      if (prod.length > 0) {
        return {
          name: props.name,
          value: prod.length,
        }
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
          fill="#6A64D9"
          label
        />

        <Label value="value" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default memo(CategoriesGraphic)
