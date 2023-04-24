import React, { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SourceFile } from "definitions/File"
import { createFile } from "features/file/fileSlice"
import useGenerateListItem, { ListItemFilterBy } from "hoeks/useGenerateListItem"
import EditorTabItem from "./EditorTabItem"

import styles from 'styles/EditorInterface/EditorTabBar.module.scss'

interface EditorTabBarInterface {

}

export default function EditorTabBar(props: EditorTabBarInterface) {

    const dispatch = useDispatch(),
          [generateListItem] = useGenerateListItem(ListItemFilterBy.openFiles)

    const activeFile:string = useSelector((state:any) => state.fileSystem.activeFile)

    const tabs = [
        <EditorTabItem key={1} id={"0"} title={"loop_exo.asm"} active={false}/>,
        <EditorTabItem key={2} id={"0"} title={"loop_exo.asm"} active={true}/>,
        <EditorTabItem key={3} id={"0"} title={"loop_exo.asm"} active={false}/>,
    ];

    const listTabs: ReactNode[] = generateListItem(
        (file: SourceFile) => (
            <EditorTabItem 
                id={file.id} 
                key={file.id} 
                title={file.name} 
                active={file.id == activeFile}
            />    
        )
    )

    return (
        <div className={styles.tabBarContainer} onDoubleClick={()=>dispatch(createFile()) }>
            <div className={styles.tabBarContent} onDoubleClick={(e)=>e.stopPropagation()}> {/*We stop propagration here to prevent open a new tab from doubleclicking on a tab*/}
                <div className={styles.emptyLeftSpace}>&nbsp;</div>
                {listTabs}
            </div>

            <button 
                className={styles.addNewFileButton}
                onClick={()=>{dispatch(createFile())}}
                onDoubleClick={(e)=>e.stopPropagation()}
            >
                <img src="/icons/Editor/icon_add_file.svg" alt="Add new file icon"/>
            </button>
        </div>
    )
}