import React, { useState } from "react"
import styles from "styles/SaveAndLoad/PopUp.module.scss"

interface SaveFooterInterface {
    onSave: Function
}

export default function SaveFooter(props: SaveFooterInterface){

    const [newName, setNewName] = useState<string>('')

    const save = () => {

        props.onSave(`${newName}.asm`)
        setNewName('')
    }

    return (
        <div className={styles.footer}>
            <input 
                className={styles.input} 
                type="text" 
                autoComplete="off"
                placeholder="Enter file name..." 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => (e.key== 'Enter')? save() : null }
            />
            <button 
                className={`${styles.saveButton} ${styles.button}`} 
                onClick={() => save()}
            >
                <img src="/icons/icon_save_disquette.svg" alt="Save file button" />
            </button>
        </div>
    )
}