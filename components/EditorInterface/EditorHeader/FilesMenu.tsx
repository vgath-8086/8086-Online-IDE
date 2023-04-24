import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames"

import { openModal } from 'features/interface/editor/editorModalsSlice'

import styles from "styles/EditorInterface/EditorScrollingMenus.module.scss"
import useExportFile from "hoeks/useExportFile";
import { ModalType } from "definitions/Modals";

interface FileMenuInterface {

}

export default function FileMenu(props: FileMenuInterface) {

    const [displayActionList, setDisplayActionList] = useState<boolean>(false);
    const [ handleExportFile ] = useExportFile()

    const disptach = useDispatch();
   
    const handleImport = () => {

        throw new Error("Function not implemented.");
    }

    const handleExport = () => {
        
        handleExportFile()
    }
    
    const handleSaveButton = () => {

        disptach(openModal(ModalType.SaveModal))
    }

    const handleLoadButton = () => {

        disptach(openModal(ModalType.LoadModal))
    }

    const handleManageButton = () => {

        disptach(openModal(ModalType.ManageModal))
    }
    
    return (
        <div className={styles.FileMenuContainer}>
            <div className={styles.mainList}>
                <div 
                    className={styles.listElement}
                    onMouseOver={()=>{setDisplayActionList(true)}}
                    onMouseOut={()=>{setDisplayActionList(false)}}
                >
                    <button className={cn([styles.button, styles.actionButton])}>Action...</button>
                    <img className={styles.moreIcon} src="icons/Header/icon_more_right_arrow.svg" alt="" />
                </div>

                <hr className={styles.separator}/>

                <div 
                    className={styles.listElement}
                    onClick={()=>handleImport()}
                >
                    <button className={cn([styles.button])}>Import from Machine</button>
                </div>

                <div 
                    className={styles.listElement}
                    onClick={()=>handleExport()}
                >
                    <button className={cn([styles.button])}>Export current File</button>
                </div>
            </div>

            <div 
                className={cn([styles.actionList, !displayActionList?styles.actionListHidden:''])}
                onMouseOver={()=>{setDisplayActionList(true)}}
                onMouseOut={()=>{setDisplayActionList(false)}}
            >
                <div 
                    className={styles.listElement}
                    onClick={()=>handleSaveButton()}
                >
                    <button className={styles.button}>Save As</button>
                </div>

                <div 
                    className={styles.listElement}
                    onClick={()=>handleLoadButton()}
                >
                    <button className={styles.button}>Load</button>
                </div>

                <div 
                    className={styles.listElement}
                    onClick={()=>handleManageButton()}
                >
                    <button className={styles.button}>Manage</button>
                </div>
            </div>

        </div>
    )
}




