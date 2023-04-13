import React, { ReactNode } from "react"
import { useSelector, useDispatch } from "react-redux"
import Modal from 'react-modal'

import { FileManager, SourceFile } from "definitions/File"
import { deleteFile } from "features/file/fileSlice"
import useExportFile from "hoeks/useExportFile";

import FilePopUpLayout from "../FilePopUpLayout"
import ManageItem from "./ManageItem"
import { closeManageModal } from 'features/interface/editor/editorModalsSlice'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface ManagePopUpInterface {

}

export default function ManagePopUp(props: ManagePopUpInterface) {

    const disptach = useDispatch()
    const [handleExportFile] = useExportFile()
    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isManageModalOpen);
    
    //should replace this line with a custom-hook
    const files:SourceFile[] = useSelector((state:any) => state.fileSystem.files),
          savedFiles:string[] = useSelector((state:any) => state.fileSystem.savedFiles)


    const listItems = [
        <ManageItem fileName="Exo1" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <ManageItem fileName="Exo_tp_2" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />,
        <ManageItem fileName="Exo_tp_bis" onDownloadClick={()=>[]} onDeleteClick={()=>[]} />
    ]

    const handleClosing = () => {

        disptach(closeManageModal())
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

    const generateListItem = (files:SourceFile[]): ReactNode[] => {
        const tabsList:ReactNode[] = [];       
        
        for (const file of files) { 

            if (savedFiles.includes( file.id )) {

                tabsList.push(
                    <ManageItem 
                        key={file.id}
                        fileName={file.name} 
                        onDeleteClick={()=>handleDelete(file.id)}
                        onDownloadClick={()=>handleExport(file.id)}
                    />
                )
            }
        }

        return tabsList;
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
                listItems={generateListItem(files)}
                footer={<></>}
            />
        </Modal>
    )
}
