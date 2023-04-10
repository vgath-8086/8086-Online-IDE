import React from "react"
import cn from "classnames"

import styles from "styles/EditorInterface/EditorScrollingMenus.module.scss"

interface FileScrollingMenuInterface {

}

export default function FileScrollingMenu(props: FileScrollingMenuInterface) {

    return (
        <div className={styles.FileMenuContainer}>
            <div className={styles.mainList}>
                <div 
                    className={styles.listElement}
                    onMouseOver={()=>{}}
                >
                    <button className={cn([styles.button, styles.actionButton])}>Action...</button>
                    <img className={styles.moreIcon} src="icons/Header/icon_more_right_arrow.svg" alt="" />

                    <div className={cn([styles.actionList, styles.actionListHidden])}>
                        <div className={styles.listElement}>
                            <button className={styles.button}>Save As</button>
                        </div>

                        <div className={styles.listElement}>
                            <button className={styles.button}>Load</button>
                        </div>

                        <div className={styles.listElement}>
                            <button className={styles.button}>Manage</button>
                        </div>
                    </div>
                </div>

                <hr className={styles.separator}/>

                <div className={styles.listElement}>
                    <button className={cn([styles.button])}>Import from Machine</button>
                </div>

                <div className={styles.listElement}>
                    <button className={cn([styles.button])}>Export current File</button>
                </div>
            </div>

        </div>
    )
}


