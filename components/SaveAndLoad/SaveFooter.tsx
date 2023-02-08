import React from "react"
import styles from "styles/SaveAndLoad/popUp.module.scss"

interface SaveFooterInterface {
    onSave: Function
}

export default function SaveFooter(props: SaveFooterInterface){
    return (
        <div className={styles.footer}>
            <input className={styles.input} type="text" placeholder="Enter file name..." />
            <button 
                className={`${styles.saveButton} ${styles.button}`} 
                onClick={() => props.onSave()}
            >
                <img src="/icons/icon_save_disquette.svg" alt="Save file button" />
            </button>
        </div>
    )
}