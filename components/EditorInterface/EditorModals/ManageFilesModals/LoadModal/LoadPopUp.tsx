import React, { ReactNode } from "react"
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux"

import { loadFile } from "features/file/fileSlice"
import { closeLoadModal } from 'features/interface/editor/editorModalsSlice'

import { SourceFile } from "definitions/File"
import FilePopUpLayout from "../FilePopUpLayout"
import LoadItem from "./LoadItem"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface LoadPopUpInterface {

}

export default function LoadPopUp(props: LoadPopUpInterface) {

    const isModalOpen:boolean = useSelector((state:any) => state.interfaceManagement.editor.modals.isLoadModalOpen);
    //should replace this line with a custom-hook
    const files:SourceFile[] = useSelector((state:any) => state.fileSystem.files);
    const savedFiles:string[] = useSelector((state:any) => state.fileSystem.savedFiles);

    const disptach = useDispatch()

    const listItems = [
        <LoadItem fileName="Exo1" onLoadClick={()=>[]} />,
        <LoadItem fileName="Exo_tp_2" onLoadClick={()=>[]} />,
        <LoadItem fileName="Exo_tp_bis" onLoadClick={()=>[]} />
    ]

    const handleClosing = () => {

        disptach(closeLoadModal())
    }

    const handleLoad = (fileId: string) => {
        
        disptach(loadFile(fileId))
        disptach(closeLoadModal())
    }

    const generateListItem = (files:SourceFile[]): ReactNode[] => {
        const tabsList:ReactNode[] = [];       
        
        for (const file of files) { 

            if (savedFiles.includes( file.id )) {

                tabsList.push(
                    <LoadItem 
                        key={file.id}
                        fileName={file.name} 
                        onLoadClick={()=>handleLoad(file.id)}
                    />
                )
            }
        }

        return tabsList;
    }

    return (
        <Modal
            isOpen={isModalOpen}
            ariaHideApp={false}
            className={styles.content}
        >  
            <FilePopUpLayout 
                headerTitle="Load File"
                headerIcon={{src: "/icons/icon_load_file.svg", alt:"Icon load file"}}
                handleClosing={() => handleClosing()}
                listItems={generateListItem(files)}
                footer={<></>}
            />
        </Modal>
    )
}
