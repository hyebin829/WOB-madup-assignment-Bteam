export interface IDailyData {
  imp: number
  click: number
  cost: number
  conv: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
  date: string
}

export interface IByChannelData {
  channel: string
  date: string
  imp: number
  click: number
  cost: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
}

export interface ICardContentData {
  title: string
  value: string
  change: string
  increase: boolean
}

export interface ISumAdData {
  sumClick: number
  sumConv: number
  sumCost: number
  sumImp: number
  sumRoas: number
  sumSales: number
}
