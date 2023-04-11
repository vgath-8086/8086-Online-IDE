import React from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import FilePopUpLayout from "./FilePopUpLayout"
import SaveItem from "./SaveItem"
import SaveFooter from "./SaveFooter"
import { closeSaveModal } from 'features/interface/editor/editorModalsSlice'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface SavePopUpInterface {

}

export default function SavePopUp(props: SavePopUpInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isSaveModalOpen);

    const disptach = useDispatch()

    const listItems = [
        <SaveItem fileName="Exo1" onSaveAsClick={undefined} />,
        <SaveItem fileName="Exo_tp_2" onSaveAsClick={undefined} />,
        <SaveItem fileName="Exo_tp_bis" onSaveAsClick={undefined} />
    ]

    const handleClosing = () => {

        disptach(closeSaveModal())
    }

    return (
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            className={styles.content}
        >       
            <FilePopUpLayout 
                headerTitle="Save File"
                headerIcon={{src: "/icons/icon_save_file.svg", alt:"Icon save file"}}
                handleClosing={() => handleClosing()}
                listItems={listItems}
                footer={<SaveFooter onSave={()=>{}}/>}
            />
        </Modal>
    )
}
