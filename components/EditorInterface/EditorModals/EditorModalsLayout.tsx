import React from "react"
import EditorCompilationModal from "./Unused/EditorCompilationModal"
import EditorSaveFileAs from "./Unused/EditorSaveFileAs"
import ConfirmCloseFileModal from "./StandardLayout/ConfirmCloseFileModal/ConfirmCloseFileModal"
import SaveFileAsModal from "./StandardLayout/SaveFileAsModal/SaveFileAsModal"

import LoadPopUp from "./ManageFilesModals/LoadPopUp"
import ManagePopUp from "./ManageFilesModals/ManagePopUp"
import SavePopUp from "./ManageFilesModals/SavePopUp"
import GeneralWarningModal from "./StandardLayout/GeneralWarningModal/GeneralWarningModal"


// TODO: Create a standard layout component for all the modals (header, content, footer)

interface EditorLayoutInterface {

}

export default function EditorLayout(props: EditorLayoutInterface) {

    return (
        <div>
            {/*<EditorCloseUnsavedFile />*/}
            <EditorCompilationModal />
            {/*<EditorSaveFileAs />*/}

            <LoadPopUp />
            <SavePopUp />
            <ManagePopUp />

            <ConfirmCloseFileModal />
            <SaveFileAsModal />
            <GeneralWarningModal />

        </div>
    )
}


