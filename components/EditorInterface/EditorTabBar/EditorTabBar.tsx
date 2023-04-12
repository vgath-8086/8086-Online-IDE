import React, { ReactNode } from "react"
import { useDispatch, useSelector } from "react-redux"

import { SourceFile } from "definitions/File"
import EditorTabItem from "./EditorTabItem"
import { createFile } from "features/file/fileSlice"

import styles from 'styles/EditorInterface/EditorTabBar.module.scss'

interface EditorTabBarInterface {

}

export default function EditorTabBar(props: EditorTabBarInterface) {

    const files:SourceFile[] = useSelector((state:any) => state.fileSystem.files),
          openedFiles:string[] = useSelector((state:any) => state.fileSystem.openedFiles),
          activeFile:string = useSelector((state:any) => state.fileSystem.activeFile);

    const dispatch = useDispatch();
    
    const tabs = [
        <EditorTabItem key={1} id={"0"} title={"loop_exo.asm"} active={false}/>,
        <EditorTabItem key={2} id={"0"} title={"loop_exo.asm"} active={true}/>,
        <EditorTabItem key={3} id={"0"} title={"loop_exo.asm"} active={false}/>,
    ];

    const generateTabs:Function = (files:SourceFile[], openedFiles:string[], activeFile:string): ReactNode[] => {
        const tabsList:ReactNode[] = [];       
        
        for (const file of files) { 

            if (openedFiles.includes( file.id )) {

                const isActive:boolean = activeFile == file.id;

                tabsList.push(
                    <EditorTabItem key={file.id} id={file.id} title={file.name} active={isActive}/>
                )
            }
        }

        return tabsList;
    }

    return (
        <div className={styles.tabBarContainer} onDoubleClick={()=>dispatch(createFile()) }>
            <div className={styles.tabBarContent} onDoubleClick={(e)=>e.stopPropagation()}> {/*We stop propagration here to prevent open a new tab from doubleclicking on a tab*/}
                <div className={styles.emptyLeftSpace}>&nbsp;</div>
                {generateTabs(files, openedFiles, activeFile)}
            </div>

            <button 
                className={styles.addNewFileButton}
                onClick={()=>{dispatch(createFile())}}
            >
                <img src="/icons/Editor/icon_add_file.svg" alt="Add new file icon"/>
            </button>
        </div>
    )
}