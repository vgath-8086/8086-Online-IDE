import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import FilePopUpLayout from "./FilePopUpLayout"
import ManageItem from "./ManageItem"
import { closeManageModal } from 'features/interface/editor/editorModalsSlice'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface ManagePopUpInterface {

}

export default function ManagePopUp(props: ManagePopUpInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isManageModalOpen);
    
    const disptach = useDispatch()

    const listItems = [
        <ManageItem fileName="Exo1" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <ManageItem fileName="Exo_tp_2" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <ManageItem fileName="Exo_tp_bis" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />
    ]

    const handleClosing = () => {

        disptach(closeManageModal())
    }

    return (
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            className={styles.content}
        >       
            <FilePopUpLayout 
                headerTitle="Explorer"
                headerIcon={{src: "/icons/icon_manage_files.svg", alt:"Icon manage files"}}
                handleClosing={() => handleClosing()}
                listItems={listItems}
                footer={<></>}
            />
        </Modal>
    )
}
