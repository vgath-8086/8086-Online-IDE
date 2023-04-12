import React, { ReactNode } from "react"
import Modal from 'react-modal'
import cn from 'classnames'

import { ModalDegree, ModalAction } from 'definitions/Modals'

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface EditorStandardModalLayoutInterface {
    isModalOpen: boolean;
    handleClosing: Function;
    headerTitle: string;
    headerIcon: {src: string, alt:string};
    headerDegree: ModalDegree;
    body: ReactNode;
    actions: ModalAction[];
}

export default function EditorStandardModalLayout(props: EditorStandardModalLayoutInterface) {

    const classNameFromDegree: { [degree in ModalDegree]: string } = {
        [ModalDegree.Neuter]: styles.neuterBackground,
        [ModalDegree.Caution]: styles.cautionBackground,
        [ModalDegree.Error]: styles.errorBackground,
        [ModalDegree.Active]: styles.activeBackground,
        [ModalDegree.Default]: styles.defaultBackground,
    };

    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                ariaHideApp={false}
                //contentLabel={props.headerTitle}
                className={`${styles.content} ${styles.standardModalContainer}`}
            >

                {/* Close Modal Button ======================================== */}
                <button 
                    className={styles.closePopupContainer} 
                    onClick={()=>{props.handleClosing()}}
                >
                    <img src="icons/icon_close_popup.svg" alt="close popup" />
                </button>

                {/* Header ==================================================== */}
                <h2 className={styles.titleContainer}>
                    <span className={cn([styles.titleContent, classNameFromDegree[props.headerDegree]])}>
                        <img 
                            className={styles.titleIcon} 
                            src={props.headerIcon.src} 
                            alt={props.headerIcon.alt} 
                        />
                        <span className={styles.titleSpan}>
                            {props.headerTitle}
                        </span>
                    </span>
                </h2>

                {/* Body ==================================================== */}
                <div className={styles.bodyContent}>
                    {props.body}
                </div>

                {/* Footer ==================================================== */}
                <hr className={styles.separatorLine}/>

                <div className={styles.footer}>
                    {props.actions.map((action: ModalAction, idx:number) => (
                        <button 
                            onClick={()=>action.callback()}
                            className={cn([styles.button, classNameFromDegree[action.degree]])}
                            key={idx}
                        >
                            {action.name}
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

