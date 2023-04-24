import React, { ReactNode } from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"

import { ModalType } from "definitions/Modals"
import { SourceFile } from "definitions/File"

import { loadFile } from "features/file/fileSlice"
import { closeModal } from 'features/interface/editor/editorModalsSlice'

import useGenerateListItem, { ListItemFilterBy } from "hoeks/useGenerateListItem"

import FilePopUpLayout from "../FilePopUpLayout"
import LoadItem from "./LoadItem"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface LoadPopUpInterface {

}

export default function LoadPopUp(props: LoadPopUpInterface) {

    const disptach = useDispatch(),
          [generateListItem] = useGenerateListItem(ListItemFilterBy.savedFiles)

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.modalsOpenState)[ModalType.LoadModal]

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

        disptach(closeModal(ModalType.LoadModal))
    }

    const handleLoad = (fileId: string) => {
        
        disptach(loadFile(fileId))
        disptach(closeModal(ModalType.LoadModal))
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
