import React from "react"
import EditorTabItem from "./EditorTabItem"

import styles from 'styles/EditorTabBar.module.scss'

interface EditorTabBarInterface {

}

export default function EditorTabBar(props: EditorTabBarInterface) {

    const tabs = [
        <EditorTabItem active={false}/>,
        <EditorTabItem active={true}/>,
        <EditorTabItem active={false}/>,

    ];

    return (
        <div className={styles.tabBarContainer}>
            <div className={styles.tabBarContent}>
                <div className={styles.emptyLeftSpace}>&nbsp;</div>
                {tabs.map((item) =>
                    item
                )}
            </div>
            
            <button className={styles.addNewFileButton}>
                <img src="/icons/Editor/icon_add_file.svg" alt="Add new file icon"/>
            </button>
        </div>
    )
}