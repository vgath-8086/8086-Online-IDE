import React from "react"
import EditorCloseUnsavedFile from "./EditorCloseUnsavedFile"
import EditorCompilationModal from "./EditorCompilationModal"
import EditorSaveFileAs from "./EditorSaveFileAs"

import LoadPopUp from "./ManageFilesModals/LoadPopUp"
import ManagePopUp from "./ManageFilesModals/ManagePopUp"
import SavePopUp from "./ManageFilesModals/SavePopUp"
import ConfirmCloseFileModal from "./StandardLayout/EditorConfirmCloseFile/ConfirmCloseFileModal"

// TODO: Create a standard layout component for all the modals (header, content, footer)

interface EditorLayoutInterface {

}

export default function EditorLayout(props: EditorLayoutInterface) {

    return (
        <div>
            {/*<EditorCloseUnsavedFile />*/}
            <EditorCompilationModal />
            <EditorSaveFileAs />

            <LoadPopUp />
            <SavePopUp />
            <ManagePopUp />

            <ConfirmCloseFileModal />
        </div>
    )
}


