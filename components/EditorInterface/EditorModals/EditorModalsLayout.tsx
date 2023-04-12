import React from "react"
import EditorCompilationModal from "./EditorCompilationModal"
import EditorSaveFileAs from "./EditorSaveFileAs"
import ConfirmCloseFileModal from "./StandardLayout/ConfirmCloseFileModal/ConfirmCloseFileModal"

import LoadPopUp from "./ManageFilesModals/LoadPopUp"
import ManagePopUp from "./ManageFilesModals/ManagePopUp"
import SavePopUp from "./ManageFilesModals/SavePopUp"
import SaveFileAsModal from "./StandardLayout/SaveFileAsModal/SaveFileAsModal"


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
            <SaveFileAsModal />
        </div>
    )
}


