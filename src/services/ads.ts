import { IAdsItem } from 'types/ads'
import { axios } from 'hooks/worker'
import { IByChannelData } from 'types/dashboard'

const DATA_URL = 'http://localhost:1004/adlist'
const DATA_URL2 = `http://localhost:3004/`

export const getAdsItemList = () => axios.get<{ count: number; ads: IAdsItem[] }>(DATA_URL)

// TODO임시 데이터 호출 로직
export const getDailyData = (currentStartDate: string, currentEndDate: string, setDailyData: Function) => {
  return axios
    .get(`${DATA_URL2}daily?date_gte=${currentStartDate}&date_lte=${currentEndDate}`)
    .then((res) => setDailyData(res.data))
}

export const getByChannelData = (currentStartDate: string, currentEndDate: string, setByChannelData: Function) => {
  return axios.get(`${DATA_URL2}byChannel?date_gte=${currentStartDate}&date_lte=${currentEndDate}`).then((res) =>
    setByChannelData(
      res.data.map((el: IByChannelData) => {
        el.sales = (el.roas * el.cost) / 100
        return el
      })
    )
  )
}

export const getByChannelDefaultData = (currentStartDate: string, currentEndDate: string) => {
  return axios.get(`${DATA_URL2}byChannel?date_gte=${currentStartDate}&date_lte=${currentEndDate}`).then((res) =>
    res.data.map((el: IByChannelData) => {
      el.sales = (el.roas * el.cost) / 100
      return el
    })
  )
}
