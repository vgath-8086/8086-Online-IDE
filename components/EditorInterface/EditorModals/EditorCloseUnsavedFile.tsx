import React from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"
import cn from 'classnames'

import { closeUnsavedFileModal, openSaveAsModal } from 'features/interface/editor/editorModalsSlice'
import { deleteFile } from 'features/file/fileSlice'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface EditorCloseUnsavedFileInterface {

}

export default function EditorCloseUnsavedFile(props: EditorCloseUnsavedFileInterface) {
    const dispatch = useDispatch();

    const modalIsOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.isUnsavedFileModalOpen);
    const fileToSave:string = useSelector((state:any) => state.fileSystem.fileToSave);

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
        <div>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                //onAfterOpen={afterOpenModal}
                //onRequestClose={closeModal}
                //style={customStyles}
                contentLabel="Example Modal"
                className={`${styles.content} ${styles.standardModalContainer}`}
                //overlayClassName={styles.overlay}
            >
                {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>*/}

                <h2 className={styles.cautionTitleContainer}>
                    <img className={styles.cautionTitleIcon} src="icons/icon_caution.svg" alt="caution" />
                    <span className={styles.cautionTitleSpan}>Caution</span>
                </h2>

                <div className={styles.unsavedFileContent}>
                    <div className={styles.unsavedFileContentMainInfo}>
                        Do you want to save the changes before closing this file ?
                    </div>
                    <div className={styles.unsavedFileContentSecondatyInfo}>
                        All unsaved modifictions will be lost.
                    </div>
                </div>

                <hr className={styles.separatorLine}/>

                <div className={styles.unsavedFileFooter}>
                    <button 
                        onClick={()=>handleDontSave()}
                        className={cn([styles.button, styles.dontSaveButton])}
                    >
                        Don't save
                    </button>
                    <button 
                        onClick={()=>handleSave()}
                        className={cn([styles.button, styles.saveButton])}
                    >
                        Save
                    </button>
                    <button 
                        onClick={()=>handleClose()}
                        className={cn([styles.button, styles.closeButton])}
                    >
                        Cancel
                    </button>

                </div>
            </Modal>
        </div>
    )
}


