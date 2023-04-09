import React from "react"
import cn from 'classnames'
import { useDispatch } from "react-redux"
import { closeFile, switchFile } from "features/file/fileSlice"

import styles from 'styles/EditorInterface/EditorTabBar.module.scss'

interface EditorTabItemInterface {
    active: boolean,
    title: string,
    id: string,
}

export default function EditorTabItem(props: EditorTabItemInterface) {
    const dispatch = useDispatch();

    return (
        <div 
            className={cn(styles.tabItemContainer, props.active ? styles.active : styles.inactive)}
            onClick={() => dispatch(switchFile(props.id))}
        >
            <span>{props.title}</span>
            <img 
                className={styles.closeIcon} 
                src="/icons/Editor/icon_closetab_active.svg" 
                alt="icon close tab" 
                onClick={(e) => {
                    e.stopPropagation();
                    dispatch(closeFile(props.id))
                }}
            />

            
        </div>
    );
}