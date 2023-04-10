import React from "react"
import cn from 'classnames'
import { useDispatch, useSelector } from "react-redux"
import { closeFile, switchFile, setFileToSave } from "features/file/fileSlice"
import { openUnsavedFileModal } from 'features/interface/editor/editorModalsSlice'

import { FileManager, SourceFile } from "definitions/File"

import styles from 'styles/EditorInterface/EditorTabBar.module.scss'

interface EditorTabItemInterface {
    active: boolean,
    title: string,
    id: string,
}

export default function EditorTabItem(props: EditorTabItemInterface) {
    
    const fileList:SourceFile[] = useSelector((state:any) => state.fileSystem.files);
    const tabFile = FileManager.findFile(fileList, props.id);
    
    const dispatch = useDispatch();

    const handleCloseTab = (e) => {
        e.stopPropagation()

        //If the file is an non-empty untitled, we should confirm before closing
        if (FileManager.isUntitled(tabFile) && !FileManager.isEmpty(tabFile)) {
            
            dispatch(setFileToSave(props.id))
            dispatch(openUnsavedFileModal())
        }
        else {

            dispatch(closeFile(props.id))
        }        
    }

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
                onClick={(e) => handleCloseTab(e)}
            />
        </div>
    );
}