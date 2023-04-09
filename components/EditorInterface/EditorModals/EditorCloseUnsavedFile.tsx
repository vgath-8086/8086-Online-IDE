import React from "react"
import { useSelector } from "react-redux"
import Modal from 'react-modal'
import cn from "classnames"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface EditorCloseUnsavedFileInterface {

}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function EditorCloseUnsavedFile(props: EditorCloseUnsavedFileInterface) {

    const modalIsOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.isFileModalClose);
    console.log(Modal.defaultStyles );

    const closeHandle = () => {
        
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
                className={cn([styles.content])}
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
                    <button className={cn([styles.button, styles.dontSaveButton])}>
                        Don't save
                    </button>
                    <button className={cn([styles.button, styles.saveButton])}>
                        Save
                    </button>
                    <button className={cn([styles.button, styles.closeButton])}>
                        Close
                    </button>

                </div>
            </Modal>
        </div>
    )
}


