import React from "react"

import styles from "styles/SaveAndLoad/SaveAndLoadItem.module.scss"

interface SaveItemInterface {
    fileName: string,
    onDownloadClick: Function,
    onDeleteClick: Function
}

export default function SaveItem(props: SaveItemInterface) {

    return (
        <>
            <div className={`${styles.itemFileName} ${styles.itemFileNameSave}`}>
                <div className={styles.itemFileNameLeftBar}>&nbsp;</div>
                {props.fileName}
            </div>

            <button 
                className={`${styles.itemFileDownload} ${styles.button}`}
                onClick={() => props.onDownloadClick()}
            >
                <img className={styles.icons} src="/icons/icon_download.svg" alt="Download file button" />
            </button>

            <button 
                className={`${styles.itemFileDelete} ${styles.button}`}
                onClick={() => props.onDeleteClick()}
            >
                <img className={styles.icons} src="/icons/icon_trash.svg" alt="Delete file button" />
            </button>        
        </>
    );
}