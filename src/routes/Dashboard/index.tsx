import AdTop from './AdTop'
import styles from './dashboard.module.scss'

const Dashboard = (): JSX.Element => {
  return (
    <div className={styles.adSectionWrapper}>
      <h2 className={styles.adSectionTitle}>통합 광고 현황</h2>
      <div className={styles.boardWrapper}>
        <AdTop />
      </div>
    </div>
  )
}

export default Dashboard
