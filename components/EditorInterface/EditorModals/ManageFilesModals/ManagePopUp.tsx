import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import FilePopUpLayout from "./FilePopUpLayout"
import SaveItem from "./SaveItem"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface ManagePopUpInterface {

}

export default function ManagePopUp(props: ManagePopUpInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isManageModalOpen);

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
                headerTitle="Explorer"
                headerIcon={{src: "/icons/icon_manage_files.svg", alt:"Icon manage files"}}
                listItems={listItems}
                footer={<></>}
            />
        </Modal>
    )
}
