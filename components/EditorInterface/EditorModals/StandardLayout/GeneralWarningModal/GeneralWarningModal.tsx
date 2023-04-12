import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { ModalDegree } from "definitions/Modals"
import { closeGeneralWarningModal } from "features/interface/editor/editorModalsSlice"
import EditorStandardModalLayout from "../EditorStandardModalLayout"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface GeneralWarningModalInterface {

}

export default function GeneralWarningModal(props: GeneralWarningModalInterface) {

    const dispatch = useDispatch()

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.isGeneralWarningModalOpen);
    const messageContent:string = useSelector((state:any) => state.interfaceManagement.editor.modals.warningMessage);

    const handleClose = () => {

        dispatch(closeGeneralWarningModal());
    }

    return (
        <EditorStandardModalLayout 
            isModalOpen={isModalOpen}
            handleClosing={() => handleClose()}

            headerTitle="Warning"
            headerIcon={{src: "icons/icon_caution.svg", alt: 'warning'}}
            headerDegree={ModalDegree.Caution}

            body={(
                <div className={styles.generalMessageContent}>
                        <span className={styles.message}>
                            {messageContent}
                        </span>
                </div>
            )}

            actions={[
                {name: "Close", degree: ModalDegree.Neuter, callback: ()=>handleClose()},
            ]}
        />
    )
}

