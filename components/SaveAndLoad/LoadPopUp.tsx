import React, { FC, ReactNode, useState } from "react"
import FilePopUpLayout from "./FilePopUpLayout"
import LoadItem from "./LoadItem"

interface LoadPopUpInterface {

}

export default function LoadPopUp(props: LoadPopUpInterface) {

    const listItems = [
        <LoadItem fileName="Exo1" onLoadClick={()=>[]} />,
        <LoadItem fileName="Exo_tp_2" onLoadClick={()=>[]} />,
        <LoadItem fileName="Exo_tp_bis" onLoadClick={()=>[]} />
    ]

    return (
       <FilePopUpLayout 
            headerTitle="Load File"
            headerIcon={{src: "/icons/icon_load_file.svg", alt:"Icon load file"}}
            listItems={listItems}
            footer={<></>}
       />
    )
}
