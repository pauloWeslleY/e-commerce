import { memo, useMemo } from 'react'
import { Flex, Text } from '@chakra-ui/react'
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

interface CustomTooltipProps {
  label: string
  payload: any
}

const CustomTooltip = ({ payload, label }: CustomTooltipProps) => {
  if (payload.length) {
    return (
      <Flex bg={'purple.400'} p={2} flexDir={'column'}>
        <Text>{`Nome: ${label}`}</Text>
        <Text>{`Unidades: ${payload[0].value}`}</Text>
      </Flex>
    )
  }

  return null
}

const ProductGraphicBarChart = () => {
  const { product } = useFetch()

  const graphicProducts = useMemo(() => {
    const prod = product.map(prod => {
      return {
        name: prod.name.slice(0, 3),
        quantity: Number(prod.quantity),
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
        <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
        <XAxis dataKey="name" stroke="#cecece" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" name="unidades" fill="#6A64D9" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default memo(ProductGraphicBarChart)
