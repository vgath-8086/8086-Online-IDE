import TerminalInterface from '../components/TerminalInterface'
import styles from '../styles/Home.module.css'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import React from 'react'

export default function Home() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className={styles.container}>
          <TerminalInterface />
        </div>
      </Provider>
    </React.StrictMode>
  )
}
