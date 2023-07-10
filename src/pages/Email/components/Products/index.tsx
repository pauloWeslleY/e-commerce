import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import 'firebase/firestore'
import { useFetch } from '../../../../hooks/useFetch'

const Chart: React.FC = () => {
  const [data, setData] = useState<{ week: string; count: number }[]>([])
  const { product } = useFetch()

  const fetchData = async () => {
    // Agrupe os produtos por semana
    const groupedData = product.reduce<{ [week: string]: number }>(
      (result, product) => {
        const week = getWeek(product.createAt.toDate())
        result[week] = (result[week] || 0) + 1
        return result
      },
      {}
    )

    // Crie o array de dados no formato necessário para o Recharts
    const chartData = Object.entries(groupedData).map(([week, count]) => ({
      week,
      count,
    }))

    setData(chartData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Função para obter o número da semana a partir de uma data
  const getWeek = (date: Date) => {
    const yearStart = new Date(date.getFullYear(), 0, 1)
    const diff = (date.getTime() - yearStart.getTime()) / 86400000
    return Math.ceil((diff + yearStart.getDay() + 1) / 7).toString()
  }

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  )
}

export default Chart
