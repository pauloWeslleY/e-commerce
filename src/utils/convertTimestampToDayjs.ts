import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Timestamp } from 'firebase/firestore'

export const currentDay = new Date()

export const convertTimestampToDayjs = (timestamp: Timestamp): Dayjs => {
  const dayTimeStamp = timestamp && typeof timestamp.toDate === 'function'
  const today = dayTimeStamp ? dayjs(timestamp.toDate()) : dayjs(currentDay)

  return today
}
