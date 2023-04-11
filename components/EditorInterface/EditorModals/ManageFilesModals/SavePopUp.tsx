import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import FilePopUpLayout from "./FilePopUpLayout"
import SaveItem from "./SaveItem"
import SaveFooter from "./SaveFooter"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface SavePopUpInterface {

}

export default function SavePopUp(props: SavePopUpInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isSaveModalOpen);

    const listItems = [
        <SaveItem fileName="Exo1" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <SaveItem fileName="Exo_tp_2" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <SaveItem fileName="Exo_tp_bis" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />
    ]

    return (
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            className={styles.content}
        >       
            <FilePopUpLayout 
                headerTitle="Save File"
                headerIcon={{src: "/icons/icon_save_file.svg", alt:"Icon save file"}}
                listItems={listItems}
                footer={<SaveFooter onSave={()=>{}}/>}
            />
        </Modal>
    )
}
