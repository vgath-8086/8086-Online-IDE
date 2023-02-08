import React from "react"

import styles from "styles/SaveAndLoad/SaveAndLoadItem.module.scss"

interface LoadItemInterface {
    fileName: string,
    onLoadClick: Function
}

export default function LoadItem(props: LoadItemInterface) {

    return (
        <>
            <div className={`${styles.itemFileName} ${styles.itemFileNameLoad}`}>
                <div className={styles.itemFileNameLeftBar}>&nbsp;</div>
                {props.fileName}
            </div>

            <button 
                className={`${styles.itemFileLoad} ${styles.button}`}
                onClick={() => props.onLoadClick()}
            >
                <img className={styles.icons} src="/icons/icon_load_button.svg" alt="Load file button" />
            </button>            
        </>
    );
}