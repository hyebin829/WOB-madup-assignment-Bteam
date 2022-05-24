import { useState } from 'react'
import { useQuery } from 'react-query'
import { useRecoilState } from 'recoil'
import dayjs from 'dayjs'

import { axios } from 'hooks/worker'
import { byChannelDataResultState, byChannelFetchState, dailyDataResultState, dailyFetchState } from 'states/dashboard'

import CalendarModal from './CalendarModal/CalendarModal'
import AdTop from './AdTop'
import Chart from './Chart'
import styles from './dashboard.module.scss'
import CurrentStatusOfMedium from './CurrentStatusOfMedium'

// TODO 달력 디폴트 날짜 설정
const defaultStartDate = dayjs(new Date(2022, 1, 1)).format('YYYY-MM-DD')
const defaultEndDate = dayjs(new Date(2022, 1, 2)).format('YYYY-MM-DD')

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStartDate, setCurrentStartDate] = useState(defaultStartDate)
  const [currentEndDate, setCurrentEndDate] = useState(defaultEndDate)
  const [dailyFetch, setDailyFetch] = useRecoilState(dailyFetchState)
  const [byChannelFetch, setByChannelFetch] = useRecoilState(byChannelFetchState)
  const [dailyData, setDailyData] = useRecoilState(dailyDataResultState)
  const [byChannelData, setByChannelData] = useRecoilState(byChannelDataResultState)

  // TODO임시 데이터 호출 로직
  const getDailyData = () => {
    return axios
      .get(`http://localhost:3004/daily?date_gte=${currentStartDate}&date_lte=${currentEndDate}`)
      .then((res) => setDailyData(res.data))
  }

  const getByChannelData = () => {
    return axios
      .get(`http://localhost:3004/byChannel?date_gte=${currentStartDate}&date_lte=${currentEndDate}`)
      .then((res) => setByChannelData(res.data))
  }

  const { data: dailyDataResult } = useQuery(['getDailyData', currentStartDate, currentEndDate], getDailyData, {
    useErrorBoundary: true,
    enabled: !!dailyFetch,
    staleTime: 6 * 50 * 1000,
    onSuccess: () => {
      setDailyFetch(false)
    },
  })

  const { data: byChannelDataResult } = useQuery(
    ['getByChannelData', currentStartDate, currentEndDate],
    getByChannelData,
    {
      useErrorBoundary: true,
      enabled: !!byChannelFetch,
      staleTime: 6 * 50 * 1000,
      onSuccess: () => {
        setByChannelFetch(false)
      },
    }
  )

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  // 선택하신 기간에 대해서
  // dailyData: 날짜별 데이터
  // byChannelData: 채널 별 데이터
  console.log(dailyData)
  console.log(byChannelData)

  return (
    <div>
      <header className={styles.header}>
        <h2>대시보드</h2>
        <div className={styles.calendarContainer}>
          <button className={styles.calendarOpenButton} type='button' onClick={handleOpenModal}>
            {`${currentStartDate} - ${currentEndDate}`}
          </button>
          {isModalOpen && (
            <div className={styles.calendar}>
              <CalendarModal
                setIsModalOpen={setIsModalOpen}
                setCurrentStartDate={setCurrentStartDate}
                setCurrentEndDate={setCurrentEndDate}
              />
            </div>
          )}
        </div>
      </header>
      <main>
        <div className={styles.adSectionWrapper}>
          <h2 className={styles.adSectionTitle}>통합 광고 현황</h2>
          <div className={styles.boardWrapper}>
            <AdTop />
            <Chart />
          </div>
        </div>
        <div className={styles.currentStatusOfMediumSectionWrapper}>
          <h2 className={styles.currentStatusOfMediumTitle}>매체 현황</h2>
          <CurrentStatusOfMedium />
        </div>
      </main>
    </div>
  )
}
export default Dashboard
