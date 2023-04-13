import React, { ReactNode } from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"

import { loadFile } from "features/file/fileSlice"
import { closeLoadModal } from 'features/interface/editor/editorModalsSlice'

import { SourceFile } from "definitions/File"
import FilePopUpLayout from "../FilePopUpLayout"
import LoadItem from "./LoadItem"

import styles from "styles/EditorInterface/EditorModals.module.scss"
import useGenerateListItem, { ListItemFilterBy } from "hoeks/useGenerateListItem"

interface LoadPopUpInterface {

}

export default function LoadPopUp(props: LoadPopUpInterface) {

    const disptach = useDispatch(),
          [generateListItem] = useGenerateListItem(ListItemFilterBy.savedFiles)

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.isLoadModalOpen)

    //---------------------------------------------
    //We generate the list of items
    //---------------------------------------------
    const listItems:ReactNode[] = generateListItem(
        (file: SourceFile) => (
            <LoadItem 
                key={file.id}
                fileName={file.name} 
                onLoadClick={()=>handleLoad(file.id)}
            />  
        )
    );

    const handleClosing = () => {

        disptach(closeLoadModal())
    }

    const handleLoad = (fileId: string) => {
        
        disptach(loadFile(fileId))
        disptach(closeLoadModal())
    }

    return (
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            className={styles.content}
        >  
            <FilePopUpLayout 
                headerTitle="Load File"
                headerIcon={{src: "/icons/icon_load_file.svg", alt:"Icon load file"}}
                handleClosing={() => handleClosing()}
                listItems={listItems}
                footer={<></>}
            />
        </Modal>
    )
}
