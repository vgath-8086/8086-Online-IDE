import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import FilePopUpLayout from "./FilePopUpLayout"
import LoadItem from "./LoadItem"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface LoadPopUpInterface {

}

export default function LoadPopUp(props: LoadPopUpInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isLoadModalOpen);

    const listItems = [
        <LoadItem fileName="Exo1" onLoadClick={()=>[]} />,
        <LoadItem fileName="Exo_tp_2" onLoadClick={()=>[]} />,
        <LoadItem fileName="Exo_tp_bis" onLoadClick={()=>[]} />
    ]

    return (
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            className={styles.content}
        >  
            <FilePopUpLayout 
                headerTitle="Load File"
                headerIcon={{src: "/icons/icon_load_file.svg", alt:"Icon load file"}}
                listItems={listItems}
                footer={<></>}
            />
        </Modal>
    )
}
