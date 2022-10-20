import EmuMenu from '../components/EmuMenu'
import styles from '../styles/Home.module.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import React from 'react'

export default function Home() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className={styles.container}>
          <EmuMenu />
        </div>
      </Provider>
    </React.StrictMode>
  )
}
