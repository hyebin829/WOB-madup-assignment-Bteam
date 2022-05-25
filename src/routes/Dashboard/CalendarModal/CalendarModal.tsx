import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { DateRange } from 'react-date-range'
import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'
import store from 'store'

import { byChannelFetchState, dailyFetchState } from 'states/dashboard'

import styles from './calendarModal.module.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface IProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const currentStartDate = store.get('startDate')
const currentEndDate = store.get('endDate')
const prevStartDate = store.get('prevStartDate')
const prevEndDate = store.get('prevEndDate')

if (!currentStartDate && !currentEndDate) {
  store.set('startDate', '2022-04-14')
  store.set('endDate', '2022-04-20')
  store.set('prevEndDate', '2022-04-13')
  store.set('prevStartDate', '2022-04-07')
}

const CalendarModal = ({ setIsModalOpen }: IProps) => {
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(dayjs(currentStartDate).format('YYYY-MM-DD')),
      endDate: new Date(dayjs(currentEndDate).format('YYYY-MM-DD')),
      key: 'selection',
    },
  ])

  const setDailyFetch = useSetRecoilState(dailyFetchState)
  const setByChannelFetch = useSetRecoilState(byChannelFetchState)

  const startDateTransformed = dayjs(dateRange[0].startDate).format('YYYY-MM-DD')
  const endDateTransformed = dayjs(dateRange[0].endDate).format('YYYY-MM-DD')

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleGetData = () => {
    const diffSelectedDate = dayjs(endDateTransformed).diff(dayjs(startDateTransformed), 'day')
    store.set('startDate', startDateTransformed)
    store.set('endDate', endDateTransformed)
    const prevDate = dayjs(startDateTransformed).subtract(1, 'day').format('YYYY-MM-DD')
    store.set('prevEndDate', dayjs(startDateTransformed).subtract(1, 'day').format('YYYY-MM-DD'))
    store.set('prevStartDate', dayjs(prevDate).subtract(diffSelectedDate, 'day').format('YYYY-MM-DD'))
    setDailyFetch(true)
    setByChannelFetch(true)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.calendarModalContainer}>
      <DateRange
        editableDateInputs={false}
        onChange={(item) => setDateRange([item.selection])}
        ranges={dateRange}
        locale={ko}
        months={2}
        direction='horizontal'
        dateDisplayFormat='yyyy년 MM월 dd일'
        // showDateDisplay={false}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} type='button' onClick={handleModalClose}>
          닫기
        </button>
        <button className={styles.button} type='button' onClick={handleGetData}>
          적용
        </button>
      </div>
    </div>
  )
}

export default CalendarModal
