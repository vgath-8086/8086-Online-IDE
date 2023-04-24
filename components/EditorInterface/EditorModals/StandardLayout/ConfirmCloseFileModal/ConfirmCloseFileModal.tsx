import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { ModalDegree } from "definitions/Modals"
import EditorStandardModalLayout from "../EditorStandardModalLayout"
import { deleteFile } from "features/file/fileSlice"
import { closeUnsavedFileModal, openSaveAsModal } from "features/interface/editor/editorModalsSlice"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface ConfirmCloseFileModalInterface {

}

export default function ConfirmCloseFileModal(props: ConfirmCloseFileModalInterface) {

    const dispatch = useDispatch()

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.isUnsavedFileModalOpen);
    const fileToSave:string = useSelector((state:any) => state.interfaceManagement.editor.modals.fileToSave);
    
    const handleClose = () => {

        dispatch(closeUnsavedFileModal(''));
    }

    const handleSave = () => {
        
        dispatch(closeUnsavedFileModal(''))
        dispatch(openSaveAsModal())
    }

    const handleDontSave = () => {
        
        dispatch(closeUnsavedFileModal(''))
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

