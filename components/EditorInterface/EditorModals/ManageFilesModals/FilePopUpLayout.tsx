import React, { ReactNode } from "react"
import styles from "styles/SaveAndLoad/PopUp.module.scss"

//The ReactNode attributes have to be warped in the <></> tag

interface FilePopUpLayoutInterface {
    headerTitle: string,
    headerIcon: {src: string, alt:string};
    handleClosing: Function;
    listItems: Array<ReactNode>;
    footer: ReactNode; 
}

export default function FilePopUpLayout(props: FilePopUpLayoutInterface) {

    return (
        <div className={styles.container}>
            <div className={styles.content}>

                {/* Close Modal Button ======================================== */}
                <button 
                    className={styles.closePopupContainer} 
                    onClick={()=>{props.handleClosing()}}
                >
                    <img src="icons/icon_close_popup.svg" alt="close popup" />
                </button>

                {/* Header ==================================================== */}
                <div className={styles.headerContainer}>
                    <div className={styles.headerContent}>
                        <img className={styles.icon} src={props.headerIcon.src} alt={props.headerIcon.alt} />
                        <div className={styles.headerTitle}>
                            {props.headerTitle}
                        </div>
                    </div>                    
                </div>
                
                {/* Body ==================================================== */}
                <div className={styles.list}>
                    {props.listItems.map((itemContent, idx)=>( /*change Idx to fileID*/
                        <div className={styles.item} key={idx}>
                            {itemContent}
                        </div>
                    ))}
                    {props.listItems.length == 0 &&
                    <div className={styles.emptyListContainer}>
                        <img className={styles.emptyIcon} src="icons/icon_empty_file_list.svg" alt="empty file list" />
                        <div className={styles.emptyMessage} >Empty repository <br/> No file saved</div>
                    </div>
                    }
                </div>

                {/* Footer ==================================================== */}
                <div className={styles.footer}>
                    {props.footer}
                </div>
            </div>
        </div>
    )
}
