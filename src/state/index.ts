import { atom } from 'recoil'

export const IndicatorCardState = atom({
  key: 'indicatorCardState',
  default: [
    {
      title: 'ROAS',
      value: '',
      change: '',
      increase: true,
    },
    {
      title: '광고비',
      value: '',
      change: '',
      increase: true,
    },
    {
      title: '노출 수',
      value: '',
      change: '',
      increase: true,
    },
    {
      title: '클릭수',
      value: '',
      change: '',
      increase: true,
    },
    {
      title: '전환 수',
      value: '',
      change: '',
      increase: true,
    },
    {
      title: '매출',
      value: '',
      change: '',
      increase: true,
    },
  ],
})
