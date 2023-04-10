import React, { useState } from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"
import cn from 'classnames'

import { closeFile, updateFileName } from "features/file/fileSlice"
import { closeSaveAsModal } from 'features/interface/editor/editorModalsSlice'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface EditorSaveFileAsInterface {

}

export default function EditorSaveFileAsFile(props: EditorSaveFileAsInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isSaveAsModalOpen);
    const fileToSave = useSelector((state:any) => state.fileSystem.fileToSave);

    const [newFileName, setNewFileName] = useState<string>('');

    const dispatch = useDispatch();

    const handleClose = () => {

        dispatch(closeSaveAsModal());
    }

    const handleSave = () => {
        if (newFileName.length > 0) {
            dispatch(updateFileName({
                newName: newFileName,
                index: fileToSave
            }));   

            dispatch(closeFile(fileToSave));
            dispatch(closeSaveAsModal());

        }
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
                    <input 
                        onChange={(e)=>setNewFileName(e.currentTarget.value)}
                        className={styles.saveFileInput} 
                        type="text" 
                        placeholder="Enter File Name..." 
                    />
                </div>

                <hr className={styles.separatorLine}/>

                <div className={styles.unsavedFileFooter}>
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


