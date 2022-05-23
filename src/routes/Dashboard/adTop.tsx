import styles from './dashboard.module.scss'

const AdTop = () => {
  const indicatorCard = {
    card: [
      {
        title: 'ROAS',
        value: '697%',
        change: '18%',
      },
      {
        title: '광고비',
        value: '3,799만 원',
        change: '18%',
      },
      {
        title: '노출 수',
        value: '971만 회',
        change: '18%',
      },
      {
        title: '클릭수',
        value: '9.4만 회',
        change: '18%',
      },
      {
        title: '전환 수',
        value: '8,253회',
        change: '18%',
      },
      {
        title: '매출',
        value: '2.6억 원',
        change: '18%',
      },
    ],
  }

  return (
    <div className={styles.adSectionWrapper}>
      <h2 className={styles.adSectionTitle}>통합 광고 현황</h2>
      <div className={styles.boardWrapper}>
        <ul className={styles.indicatorWrapper}>
          {indicatorCard.card.map((item) => (
            <li key={item.title} className={styles.indicatorCard}>
              <dl>
                <dt>{item.title}</dt>
                <dd>{item.value}</dd>
              </dl>
              <span>{item.change}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdTop
