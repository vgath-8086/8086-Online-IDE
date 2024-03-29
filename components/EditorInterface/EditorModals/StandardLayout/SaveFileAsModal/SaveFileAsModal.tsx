import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { ModalDegree, ModalType } from "definitions/Modals"
import { updateFileName, saveFile } from "features/file/fileSlice"
import { closeModal, shiftJobOutPipeLine } from "features/interface/editor/editorModalsSlice"

import EditorStandardModalLayout from "../EditorStandardModalLayout"

import styles from "styles/EditorInterface/EditorModals.module.scss"

interface SaveFileAsModalInterface {

}

export default function SaveFileAsModal(props: SaveFileAsModalInterface) {

    const isModalOpen = useSelector((state:any) => state.interfaceManagement.editor.modals.modalsOpenState)[ModalType.SaveAsModal];
    const fileToSave = useSelector((state:any) => state.interfaceManagement.editor.modals.fileToSave);
    
    const pipeline:Function[] = useSelector((state:any) => state.interfaceManagement.editor.modals.modalPipLine);

    const [newFileName, setNewFileName] = useState<string>('');

    const dispatch = useDispatch();

    const handleClose = () => {

        dispatch(closeModal(ModalType.SaveAsModal));
    }

    const handleSave = () => {
        
        if (newFileName.length > 0) {

            dispatch(updateFileName({

                newName: capitalize(`${newFileName}.asm`), //Here we capitalize the first letter for aesthetic purposes only
                index: fileToSave
            }));   

            dispatch(saveFile(fileToSave));
            dispatch(closeModal(ModalType.SaveAsModal));

            if (pipeline.length > 0) {

                dispatch(pipeline[0](fileToSave));
                dispatch(shiftJobOutPipeLine());
            }
        }
    }

    function capitalize(s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }

    return (
        <EditorStandardModalLayout 
            isModalOpen={isModalOpen}
            handleClosing={() => handleClose()}

            headerTitle="Save File"
            headerIcon={{src: "icons/icon_save_file.svg", alt: 'save'}}
            headerDegree={ModalDegree.Default}

            body={(
                <div className={styles.saveFileAsContent}>
                    <input 
                        onChange={(e)=>setNewFileName(e.currentTarget.value)}
                        className={styles.saveFileAsInput} 
                        type="text" 
                        placeholder="Enter file name..." 
                    />

                    <div className={styles.saveFileAsExtension}>
                        .asm
                    </div>
                </div>
            )}

            actions={[
                {name: "Save", degree: ModalDegree.Active, callback: ()=>handleSave()},
                {name: "Close", degree: ModalDegree.Neuter, callback: ()=>handleClose()},
            ]}
        />
    )
}

