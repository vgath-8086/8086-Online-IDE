import React from "react"
import FilePopUpLayout from "./FilePopUpLayout"
import SaveItem from "./SaveItem"
import SaveFooter from "./SaveFooter"

interface SavePopUpInterface {

}

export default function SavePopUp(props: SavePopUpInterface) {

    const listItems = [
        <SaveItem fileName="Exo1" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <SaveItem fileName="Exo_tp_2" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <SaveItem fileName="Exo_tp_bis" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />
    ]

    return (
       <FilePopUpLayout 
            headerTitle="Save File"
            headerIcon={{src: "/icons/icon_save_file.svg", alt:"Icon save file"}}
            listItems={listItems}
            footer={<SaveFooter onSave={()=>{}}/>}
       />
    )
}
