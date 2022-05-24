import { useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'

import { useRecoilState } from 'recoil'
import { IndicatorCardState } from 'state'

import styles from './dashboard.module.scss'
import { DecreaseIcon, IncreaseIcon } from 'assets/svgs'

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

  // 선택 기간, 며칠인지 계산
  const startDate = dayjs('2022-04-01').format('YYYY-MM-DD')
  const endDate = dayjs('2022-04-11').format('YYYY-MM-DD')

  const diffSelectDate = dayjs(endDate).diff(dayjs(startDate), 'day')
  console.log(diffSelectDate)

  // 선택한 기간만큼의 이전 기간
  const prevEndDate = dayjs(startDate).subtract(1, 'day').format('YYYY-MM-DD')
  console.log(prevEndDate)

  const prevStartDate = dayjs(prevEndDate).subtract(diffSelectDate, 'day').format('YYYY-MM-DD')
  console.log(prevStartDate)

  const { isLoading, error, data } = useQuery(['getAdInfo', startDate, endDate], async () => {
    const res = await getAdInfo({
      date_gte: startDate,
      date_lte: endDate,
    })
    return res.data
  })

  // 항목별 합계
  const sumCost = data?.map((item: Iindicator) => item.cost).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumImp = data?.map((item: Iindicator) => item.imp).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumClick = data?.map((item: Iindicator) => item.click).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumConv = data?.map((item: Iindicator) => item.conv).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumSales = data
    ?.map((item: Iindicator) => (item.cost * item.roas) / 100)
    .reduce((acc: number, cur: number) => acc + cur, 0)
  const sumRoas = (sumSales / sumCost) * 100
  // const Sales = cost * roas / 100

  // 이전 기간 데이터 불러오기
  const { data: prevData } = useQuery(['getPrevAdInfo', prevStartDate, prevEndDate], async () => {
    const response = await getAdInfo({
      date_gte: prevStartDate,
      date_lte: prevEndDate,
    })
    return response.data
  })
  console.log(prevData)
  const sumPrevCost = prevData?.map((item: Iindicator) => item.cost).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumPrevImp = prevData?.map((item: Iindicator) => item.imp).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumPrevClick = prevData
    ?.map((item: Iindicator) => item.click)
    .reduce((acc: number, cur: number) => acc + cur, 0)
  const sumPrevConv = prevData?.map((item: Iindicator) => item.conv).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumPrevSales = prevData
    ?.map((item: Iindicator) => (item.cost * item.roas) / 100)
    .reduce((acc: number, cur: number) => acc + cur, 0)
  const sumPrevRoas = (sumPrevSales / sumPrevCost) * 100

  useEffect(() => {
    setIndicator([
      {
        title: 'ROAS',
        value: `${sumRoas.toFixed(2).toLocaleString()}%`,
        change: `${Math.abs(sumPrevRoas - sumRoas)
          .toFixed(2)
          .toLocaleString()}%`,
        increase: sumPrevRoas - sumRoas > 0,
      },
      {
        title: '광고비',
        value: `${sumCost.toLocaleString()}원`,
        change: `${Math.abs(sumPrevCost - sumCost).toLocaleString()}원`,
        increase: sumPrevCost - sumCost > 0,
      },
      {
        title: '노출 수',
        value: `${sumImp.toLocaleString()}회`,
        change: `${Math.abs(sumPrevImp - sumImp).toLocaleString()}회`,
        increase: sumPrevImp - sumImp > 0,
      },
      {
        title: '클릭수',
        value: `${sumClick.toLocaleString()}회`,
        change: `${Math.abs(sumPrevClick - sumClick).toLocaleString()}회`,
        increase: sumPrevClick - sumClick > 0,
      },
      {
        title: '전환 수',
        value: `${sumConv.toLocaleString()}회`,
        change: `${Math.abs(sumPrevConv - sumConv).toLocaleString()}회`,
        increase: sumPrevConv - sumConv > 0,
      },
      {
        title: '매출',
        value: `${Math.floor(sumSales).toLocaleString()}원`,
        change: `${Math.floor(Math.abs(sumPrevSales - sumSales)).toLocaleString()}원`,
        increase: sumPrevSales - sumSales > 0,
      },
    ])
  }, [
    setIndicator,
    sumCost,
    sumClick,
    sumConv,
    sumImp,
    sumSales,
    sumRoas,
    sumPrevRoas,
    sumPrevCost,
    sumPrevImp,
    sumPrevClick,
    sumPrevConv,
    sumPrevSales,
  ])

  interface Params {
    date_gte: string
    date_lte: string
  }

  const getAdInfo = (params: Params) =>
    axios.get(`http://localhost:3004/daily`, {
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
