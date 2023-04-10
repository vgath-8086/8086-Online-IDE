import React from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"
import cn from 'classnames'

import { closeSaveAsModal } from 'features/interface/editor/editorModalsSlice'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface EditorSaveFileAsInterface {

}

export default function EditorSaveFileAsFile(props: EditorSaveFileAsInterface) {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isSaveAsModalOpen);

    const handleClose = () => {

        dispatch(closeSaveAsModal());
    }

    const handleSave = () => {
        
        dispatch;
    }
    
    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                ariaHideApp={false}
                //onAfterOpen={afterOpenModal}
                //onRequestClose={closeModal}
                //style={customStyles}
                contentLabel="Example Modal"
                className={styles.content}
                //overlayClassName={styles.overlay}
            >
                {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>*/}

                <h2 className={styles.saveTitleContainer}>
                    <img className={styles.saveTitleIcon} src="icons/icon_save_file.svg" alt="save" />
                    <span className={styles.saveTitleSpan}>Save Untitled File</span>
                </h2>

                <div className={styles.saveFileContent}>
                    <input className={styles.saveFileInput} type="text" placeholder="Enter File Name..." />
                </div>

                <hr className={styles.separatorLine}/>

                <div className={styles.unsavedFileFooter}>
                    <button className={cn([styles.button, styles.saveButton])}>
                        Save
                    </button>
                    <button 
                        onClick={()=>handleClose()}
                        className={cn([styles.button, styles.closeButton])}>
                        Cancel
                    </button>

                </div>
            </Modal>
        </div>
    )
}


