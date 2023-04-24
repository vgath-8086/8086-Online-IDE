import React, { ReactNode } from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import { FileManager, SourceFile } from "definitions/File"
import { deleteFile } from "features/file/fileSlice"
import useExportFile from "hoeks/useExportFile";

import useGenerateListItem, { ListItemFilterBy } from "hoeks/useGenerateListItem"
import { closeModal } from 'features/interface/editor/editorModalsSlice'

import FilePopUpLayout from "../FilePopUpLayout"
import ManageItem from "./ManageItem"

import styles from "styles/EditorInterface/EditorModals.module.scss"
import { ModalType } from "definitions/Modals"

interface ManagePopUpInterface {

}

export default function ManagePopUp(props: ManagePopUpInterface) {

    const disptach = useDispatch(),
          [handleExportFile] = useExportFile(),
          [generateListItem] = useGenerateListItem(ListItemFilterBy.savedFiles)

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.modalsOpenState)[ModalType.ManageModal];

    //---------------------------------------------
    //We generate the list of items
    //---------------------------------------------
    const listItems:ReactNode[] = generateListItem(
        (file: SourceFile) => (
            <ManageItem 
                key={file.id}
                fileName={file.name} 
                onDeleteClick={()=>handleDelete(file.id)}
                onDownloadClick={()=>handleExport(file.id)}
            />    
        )
    );

    const handleClosing = () => {

        disptach(closeModal(ModalType.ManageModal))
    }

    
    const handleDelete = (fileId: string) => {
        
        disptach(deleteFile(fileId))
        //We don't need to close the Popup after executing the action
        //disptach(closeManageModal())
    }

    const handleExport = (fileId: string) => {
        
        handleExportFile(fileId);
        //We don't need to close the Popup after executing the action
        //disptach(closeManageModal())
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
