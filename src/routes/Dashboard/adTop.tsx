import axios from 'axios'
import styles from './dashboard.module.scss'
import dayjs from 'dayjs'
import { useQuery } from 'react-query'
import { DecreaseIcon, IncreaseIcon } from 'assets/svgs'
import { useRecoilState } from 'recoil'
import { IndicatorCardState } from 'state'
import { useEffect } from 'react'

const AdTop = () => {
  interface Iindicator {
    click: number
    conv: number
    convValue: number
    cost: number
    cpa: number
    cpc: number
    ctr: number
    cvr: number
    date: string
    imp: number
    roas: number
  }
  const [indicator, setIndicator] = useRecoilState(IndicatorCardState)

  const startDate = dayjs('2022-02-01').format('YYYY-MM-DD')
  const endDate = dayjs('2022-02-11').format('YYYY-MM-DD')

  const diffSelectDate = dayjs(endDate).diff(dayjs(startDate), 'day')
  console.log(diffSelectDate)

  const compareEndDate = dayjs(startDate).subtract(1, 'day').format('YYYY-MM-DD')
  console.log(compareEndDate)

  const compareStartDate = dayjs(compareEndDate).subtract(diffSelectDate, 'day').format('YYYY-MM-DD')
  console.log(compareStartDate)

  const { isLoading, error, data } = useQuery(['getAdInfo', startDate, endDate], async () => {
    const res = await getAdInfo({
      date_gte: startDate,
      date_lte: endDate,
    })
    return res.data
  })

  data?.map((item: Iindicator) => console.log(item.imp))

  const sumCost = data?.map((item: Iindicator) => item.cost).reduce((prev: number, curr: number) => prev + curr, 0)
  const sumImp = data?.map((item: Iindicator) => item.imp).reduce((prev: number, curr: number) => prev + curr, 0)
  const sumClick = data?.map((item: Iindicator) => item.click).reduce((prev: number, curr: number) => prev + curr, 0)
  const sumConvValue = data
    ?.map((item: Iindicator) => item.convValue)
    .reduce((prev: number, curr: number) => prev + curr, 0)

  useEffect(() => {
    setIndicator([
      {
        title: 'ROAS',
        value: '00000',
        change: '00000',
        increase: true,
      },
      {
        title: '광고비',
        value: sumCost,
        change: '00000',
        increase: true,
      },
      {
        title: '노출 수',
        value: sumImp,
        change: '00000',
        increase: true,
      },
      {
        title: '클릭수',
        value: sumClick,
        change: '00000',
        increase: true,
      },
      {
        title: '전환 수',
        value: sumConvValue,
        change: '00000',
        increase: true,
      },
      {
        title: '매출',
        value: '00000',
        change: '00000',
        increase: true,
      },
    ])
  }, [setIndicator, sumCost, sumClick, sumConvValue, sumImp])

  interface Params {
    date_gte: string
    date_lte: string
  }

  const getAdInfo = (params: Params) =>
    axios.get(`http://localhost:1004/daily`, {
      params: {
        ...params,
      },
    })

  return (
    <ul className={styles.indicatorWrapper}>
      {indicator.map((item) => (
        <li key={item.title} className={styles.indicatorCard}>
          <dl>
            <dt>{item.title}</dt>
            <dd>{item.value}</dd>
          </dl>
          <div className={styles.changeWrapper}>
            {item.increase ? <IncreaseIcon /> : <DecreaseIcon />}
            <span>{item.change}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AdTop
