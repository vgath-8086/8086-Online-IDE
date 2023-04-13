import React, { ReactNode } from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"

import { closeSaveModal } from 'features/interface/editor/editorModalsSlice'
import useGenerateListItem, { ListItemFilterBy } from "hoeks/useGenerateListItem"

import FilePopUpLayout from "../FilePopUpLayout"
import SaveItem from "./SaveItem"
import SaveFooter from "./SaveFooter"

import styles from "styles/EditorInterface/EditorModals.module.scss"
import { SourceFile } from "definitions/File"


interface SavePopUpInterface {

}

export default function SavePopUp(props: SavePopUpInterface) {

    const disptach = useDispatch(),
          [ generateListItem ] = useGenerateListItem(ListItemFilterBy.savedFiles)

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isSaveModalOpen);

    //---------------------------------------------
    //We generate the list of items
    //---------------------------------------------
    const listItems:ReactNode[] = generateListItem(
        (file: SourceFile) => (
            <SaveItem 
                key={file.id}
                fileName={file.name} 
                onSaveAsClick={undefined} 
            />    
        )
    );

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
