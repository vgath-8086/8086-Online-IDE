import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { ModalDegree, ModalType } from "definitions/Modals"
import { closeFile, deleteFile } from "features/file/fileSlice"
import { closeModal, openModal, pushJobToPipeLine } from "features/interface/editor/editorModalsSlice"

import EditorStandardModalLayout from "../EditorStandardModalLayout"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface ConfirmCloseFileModalInterface {

}

export default function ConfirmCloseFileModal(props: ConfirmCloseFileModalInterface) {

    const dispatch = useDispatch()

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.modalsOpenState)[ModalType.ConfirmCloseModal];
    const fileToSave:string = useSelector((state:any) => state.interfaceManagement.editor.modals.fileToSave);
    
    const handleClose = () => {

        dispatch(closeModal(ModalType.ConfirmCloseModal))
    }

    const handleSave = () => {
        
        dispatch(closeModal(ModalType.ConfirmCloseModal))
        dispatch(openModal(ModalType.SaveAsModal))
        dispatch(pushJobToPipeLine((fileToSave)=> closeFile(fileToSave)))
    }

    const handleDontSave = () => {
        
        dispatch(closeModal(ModalType.ConfirmCloseModal))
        dispatch(deleteFile(fileToSave))
    }

    return (
        <EditorStandardModalLayout 
            isModalOpen={isModalOpen}
            handleClosing={() => handleClose()}

            headerTitle="Caution"
            headerIcon={{src: "icons/icon_caution.svg", alt: 'caution'}}
            headerDegree={ModalDegree.Caution}

            body={(
                <div className={styles.confirmCloseFileContent}>
                    <div className={styles.confirmCloseFileMain}>
                        Do you want to save the changes before closing this file ?
                    </div>
                    <div className={styles.confirmCloseFileDescription}>
                        All unsaved modifictions will be lost.
                    </div>
                </div>
            )}

            actions={[
                {name: "Don't Save", degree: ModalDegree.Caution, callback: ()=>handleDontSave()},
                {name: "Save", degree: ModalDegree.Active, callback: ()=>handleSave()},
                {name: "Close", degree: ModalDegree.Neuter, callback: ()=>handleClose()},
            ]}
        />
    )
}

