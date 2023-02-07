import React, { useState } from "react"
import styles from "styles/popUp.module.scss"

interface SavePopUpInterface {

}

export default function SavePopUp(props: SavePopUpInterface) {


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerContent}>
                        <img className={styles.icon} src="/icons/icon_save_file.svg" alt="Save file icon" />
                        <div className={styles.headerTitle} >Save File</div>
                    </div>                    
                </div>

                <div className={styles.list}>

                    <div className={styles.item}>
                        <div className={styles.itemFileName}>
                            <div className={styles.itemFileNameLeftBar}>&nbsp;</div>
                            file1.asm
                        </div>

                        <button className={`${styles.itemFileDownload} ${styles.button}`}>
                            <img className={styles.icons} src="/icons/icon_download.svg" alt="Download file button" />
                        </button>

                        <button className={`${styles.itemFileDelete} ${styles.button}`}>
                            <img className={styles.icons} src="/icons/icon_trash.svg" alt="Delete file button" />
                        </button>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemFileName}>
                            <div className={styles.itemFileNameLeftBar}>&nbsp;</div>
                            exo_tp_2.asm
                        </div>

                        <button className={`${styles.itemFileDownload} ${styles.button}`}>
                            <img className={styles.icons} src="/icons/icon_download.svg" alt="Download file button" />
                        </button>

                        <button className={`${styles.itemFileDelete} ${styles.button}`}>
                            <img className={styles.icons} src="/icons/icon_trash.svg" alt="Delete file button" />
                        </button>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemFileName}>
                            <div className={styles.itemFileNameLeftBar}>&nbsp;</div>
                            exo_tp_bis.asm
                        </div>

                        <button className={`${styles.itemFileDownload} ${styles.button}`}>
                            <img className={styles.icons} src="/icons/icon_download.svg" alt="Download file button" />
                        </button>

                        <button className={`${styles.itemFileDelete} ${styles.button}`}>
                            <img className={styles.icons} src="/icons/icon_trash.svg" alt="Delete file button" />
                        </button>
                    </div>

                </div>


                <div className={styles.footer}>
                    <input className={styles.input} type="text" placeholder="Enter file name..." />
                    <button className={`${styles.saveButton} ${styles.button}`}>
                        <img src="/icons/icon_save_disquette.svg" alt="Save file button" />
                    </button>
                </div>
            </div>
        </div>
    );
}