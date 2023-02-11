import React from "react"
import cn from 'classnames'

import styles from 'styles/EditorTabBar.module.scss'

interface EditorTabItemInterface {
    active: boolean
}

export default function EditorTabItem(props: EditorTabItemInterface) {

    return (
        <div className={cn(styles.tabItemContainer, props.active ? styles.active : styles.inactive)}>
            <span>loop_exo.asm</span>
            <img className={styles.closeIcon} src="/icons/Editor/icon_closetab_active.svg" alt="icon close tab" />
        </div>
    );
}