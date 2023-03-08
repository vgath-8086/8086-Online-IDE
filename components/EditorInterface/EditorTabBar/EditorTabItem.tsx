import React from "react"
import cn from 'classnames'

import styles from 'styles/EditorInterface/EditorTabBar.module.scss'

interface EditorTabItemInterface {
    active: boolean,
    title: string
}

export default function EditorTabItem(props: EditorTabItemInterface) {

    return (
        <div className={cn(styles.tabItemContainer, props.active ? styles.active : styles.inactive)}>
            <span>{props.title}</span>
            <img className={styles.closeIcon} src="/icons/Editor/icon_closetab_active.svg" alt="icon close tab" />
        </div>
    );
}