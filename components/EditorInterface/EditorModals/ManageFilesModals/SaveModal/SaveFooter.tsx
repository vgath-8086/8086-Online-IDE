import React, { useState } from "react"
import styles from "styles/SaveAndLoad/PopUp.module.scss"

interface SaveFooterInterface {
    onSave: Function
}

export default function SaveFooter(props: SaveFooterInterface){

    const [newName, setNewName] = useState<string>('')

    return (
        <div className={styles.footer}>
            <input 
                className={styles.input} 
                type="text" 
                placeholder="Enter file name..." 
                onChange={(e) => setNewName(e.target.value)}
            />
            <button 
                className={`${styles.saveButton} ${styles.button}`} 
                onClick={() => props.onSave()}
            >
                <img src="/icons/icon_save_disquette.svg" alt="Save file button" />
            </button>
        </div>
    )
}