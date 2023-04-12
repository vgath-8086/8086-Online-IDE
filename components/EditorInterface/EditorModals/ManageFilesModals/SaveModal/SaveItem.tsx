import React from "react"

import styles from "styles/SaveAndLoad/SaveAndLoadItem.module.scss"

interface SaveItemInterface {
    fileName: string,
    onSaveAsClick: Function
}

export default function SaveItem(props: SaveItemInterface) {

    return (
        <>
            <div 
                className={`${styles.itemFileName} ${styles.itemFileNameSave}`}
                onClick={() => props.onSaveAsClick()}
            >
                <div className={styles.itemFileNameLeftBar}>&nbsp;</div>
                {props.fileName}
            </div>        
        </>
    );
}