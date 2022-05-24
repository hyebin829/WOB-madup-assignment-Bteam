/* eslint-disable react/style-prop-object */
import React from 'react'
import styles from './CurrentStatusOfMedium.module.scss'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme } from 'victory'
import { dummyChanneldata } from './dummyChannelData'

const CurrentStatusOfMedium = () => {
  const addedSalesKeyData = dummyChanneldata.map((el) => {
    el.sales = (el.roas * el.cost) / 100
    return el
  })

  const reduceData = (_channel: string) => {
    return addedSalesKeyData
      .filter((el: { channel: string }) => el.channel === _channel)
      .reduce((acc, cur) => {
        if (cur.sales !== undefined && acc.sales !== undefined) {
          return {
            sales: cur.sales + acc.sales,
            channel: cur.channel,
            imp: cur.imp + acc.imp,
            click: cur.click + acc.click,
            cost: cur.cost + acc.cost,
            convValue: cur.convValue + acc.convValue,
            ctr: cur.ctr + acc.ctr,
            cpc: cur.cpc + acc.cpc,
            roas: cur.roas + acc.roas,
          }
        }
        return {
          channel: cur.channel,
          imp: cur.imp + acc.imp,
          click: cur.click + acc.click,
          cost: cur.cost + acc.cost,
          convValue: cur.convValue + acc.convValue,
          ctr: cur.ctr + acc.ctr,
          cpc: cur.cpc + acc.cpc,
          roas: cur.roas + acc.roas,
        }
      })
  }
  const reducedDataObj: any = {
    google: reduceData('google'),
    naver: reduceData('naver'),
    facebook: reduceData('facebook'),
    kakao: reduceData('kakao'),
  }

  const createVictoryBarData = (key: string) => {
    return [
      {
        xAxis: 'sales',
        yAxis: Math.round(
          (reducedDataObj[key].sales /
            (reducedDataObj.google.sales +
              reducedDataObj.naver.sales +
              reducedDataObj.facebook.sales +
              reducedDataObj.kakao.sales)) *
            100
        ),
      },
      {
        xAxis: 'click',
        yAxis: Math.round(
          (reducedDataObj[key].click /
            (reducedDataObj.google.click +
              reducedDataObj.naver.click +
              reducedDataObj.facebook.click +
              reducedDataObj.kakao.click)) *
            100
        ),
      },
      {
        xAxis: 'cost',
        yAxis: Math.round(
          (reducedDataObj[key].cost /
            (reducedDataObj.google.cost +
              reducedDataObj.naver.cost +
              reducedDataObj.facebook.cost +
              reducedDataObj.kakao.cost)) *
            100
        ),
      },
      {
        xAxis: 'imp',
        yAxis: Math.round(
          (reducedDataObj[key].imp /
            (reducedDataObj.google.imp +
              reducedDataObj.naver.imp +
              reducedDataObj.facebook.imp +
              reducedDataObj.kakao.imp)) *
            100
        ),
      },
      {
        xAxis: 'convValue',
        yAxis: Math.round(
          (reducedDataObj[key].convValue /
            (reducedDataObj.google.convValue +
              reducedDataObj.naver.convValue +
              reducedDataObj.facebook.convValue +
              reducedDataObj.kakao.convValue)) *
            100
        ),
      },
    ]
  }
  const reducedDataArr = [reduceData('google'), reduceData('naver'), reduceData('facebook'), reduceData('kakao')]

  console.log(
    reducedDataArr,
    createVictoryBarData('google'),
    createVictoryBarData('facebook'),
    createVictoryBarData('naver'),
    createVictoryBarData('kakao')
  )

  return (
    <div className={styles.currentStatusOfMediumContainer}>
      <div className={styles.rechartsContainer}>
        <div className={styles.rechartsWrapper}>
          <VictoryChart width={800} height={400} domainPadding={30} theme={VictoryTheme.material}>
            <VictoryAxis
              tickValues={['sales', 'click', 'cost', 'imp', 'convValue']}
              tickFormat={['매출', '광고비', '노출 수', '클릭 수', '전환 수']}
            />
            <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
            <VictoryStack colorScale={['#56adf7', '#85da47', '#ac8af8', '#f8d849']}>
              <VictoryBar data={createVictoryBarData('google')} x='xAxis' y='yAxis' />
              <VictoryBar data={createVictoryBarData('facebook')} x='xAxis' y='yAxis' />
              <VictoryBar data={createVictoryBarData('naver')} x='xAxis' y='yAxis' />
              <VictoryBar data={createVictoryBarData('kakao')} x='xAxis' y='yAxis' />
            </VictoryStack>
          </VictoryChart>
        </div>
        <div className={styles.legendWrapper}>recharts legend</div>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableContent}>
          <table>
            <thead className='ant-table-thead'>
              <tr>
                <th className='ant-table-cell'>
                  <span className='ant-table-cell-content' />
                </th>
                <th className='ant-table-cell'>광고비</th>
                <th className='ant-table-cell'>매출</th>
                <th className='ant-table-cell'>광고수익률(ROAS)</th>
                <th className='ant-table-cell'>노출수</th>
                <th className='ant-table-cell'>클릭수</th>
                <th className='ant-table-cell'>클릭률(CTR)</th>
                <th className='ant-table-cell'>클릭당비용(CPC)</th>
              </tr>
            </thead>
            <tbody className='ant-table-tbody'>
              {reducedDataArr.map((item) => {
                return (
                  <tr
                    key={`key ${item.channel}`}
                    data-row-key={`${item.channel}`}
                    className='ant-table-row ant-table-row-level-0'
                  >
                    <td title={`${item.channel}`}>
                      <span className='ant-table-cell-content'>{item.channel.toUpperCase()}</span>
                    </td>
                    <td className='ant-table-cell'>{Math.round(item.cost)}</td>
                    <td className='ant-table-cell'>{item.sales ? Math.round(item.sales) : 0}</td>
                    <td className='ant-table-cell'>{Math.round(item.roas)}%</td>
                    <td className='ant-table-cell'>{Math.round(item.convValue)}</td>
                    <td className='ant-table-cell'>{Math.round(item.imp)}</td>
                    <td className='ant-table-cell'>{Math.round(item.ctr)}%</td>
                    <td className='ant-table-cell'>{Math.round(item.cpc)}원</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className='ant-table-summary'>
              <tr>
                <td className='ant-table-cell'>총계</td>
                <td className='ant-table-cell'>
                  {reducedDataObj.google.cost +
                    reducedDataObj.naver.cost +
                    reducedDataObj.facebook.cost +
                    reducedDataObj.kakao.cost}
                </td>
                <td className='ant-table-cell'>7,353,000원</td>
                <td className='ant-table-cell'>1,263%</td>
                <td className='ant-table-cell'>168,927</td>
                <td className='ant-table-cell'>2,064</td>
                <td className='ant-table-cell'>1.22%</td>
                <td className='ant-table-cell'>282원</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CurrentStatusOfMedium
