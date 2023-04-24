import React from "react"
import { useDispatch, useSelector } from "react-redux"

import { ModalDegree, ModalType } from "definitions/Modals"
import { closeModal } from "features/interface/editor/editorModalsSlice"
import EditorStandardModalLayout from "../EditorStandardModalLayout"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface CompilationErrorModalInterface {

}

export default function CompilationErrorModal(props: CompilationErrorModalInterface) {

    const dispatch = useDispatch()

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.modalsOpenState)[ModalType.CompilationErrorModal];
    //const compilationMessage:string = useSelector((state:any) => state);

    const handleClose = () => {

        dispatch(closeModal(ModalType.CompilationErrorModal));
    }

    return (
        <EditorStandardModalLayout 
            isModalOpen={isModalOpen}
            handleClosing={() => handleClose()}

            headerTitle="Compilation Error"
            headerIcon={{src: "icons/icon_caution.svg", alt: 'warning'}}
            headerDegree={ModalDegree.Caution}

            body={(
                <div className={styles.compilationMessageContent}>
                    <div className={styles.lineContainer}>
                        <div className={styles.lineTitle}>Information</div>
                        <div className={styles.lineMessage}>Line 7</div>
                    </div>
                    <div className={styles.lineContainer}>
                        <div className={styles.lineTitle}>Message</div>
                        <div className={styles.lineMessage}>Illegal memory to memory action</div>
                    </div>
                </div>
            )}

            actions={[
                {name: "Close", degree: ModalDegree.Neuter, callback: ()=>handleClose()},
            ]}
        />
    )
}

