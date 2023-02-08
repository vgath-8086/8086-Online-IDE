//import TerminalInterface from '../components/TerminalInterface'
import { store } from '../app/store'
import { Provider } from 'react-redux'
import React from 'react'


import dynamic from "next/dynamic";

import SavePopUp from "components/SaveAndLoad/SavePopUp";
import LoadPopUp from "components/SaveAndLoad/LoadPopUp";

const NoSSRComponent = dynamic(() => import("../components/TerminalInterface"), {
  ssr: false,
  type: "module"
});

function TestsPage(props) {
  return <NoSSRComponent />;
}


export default function Home() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          {/*<TestsPage />*/}
          <SavePopUp />
          <LoadPopUp />
        </div>
      </Provider>
    </React.StrictMode>
  )
}
