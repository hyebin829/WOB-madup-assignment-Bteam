import { Routes, Route } from 'react-router-dom'

import styles from './routes.module.scss'

import Dashboard from './Dashboard'
import AdvertiseManage from './AdvertiseManage'
import Layout from 'layout'

const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='advertise' element={<AdvertiseManage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
