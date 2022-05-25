import { atom } from 'recoil'
import { IByChannelData, ICardContentData, IDailyData } from 'types/dashboard'

export const dailyDataResultState = atom<IDailyData[]>({
  key: '#dailyDataResultState',
  default: [],
})

export const prevDailyDataResultState = atom<IDailyData[]>({
  key: '#prevdailyDataResultState',
  default: [],
})

export const byChannelDataResultState = atom<IByChannelData[]>({
  key: '#byChannelDataResultState',
  default: [],
})

export const dashboardAdCardState = atom({
  key: '#dashboardAdCardState',
  default: [],
})

export const dailyFetchState = atom<boolean>({
  key: '#dailyFetchState',
  default: false,
})
export const byChannelFetchState = atom<boolean>({
  key: '#byChannelFetchState',
  default: false,
})

export const adCardContentState = atom<ICardContentData[]>({
  key: '#adCardContentState',
  default: [],
})
