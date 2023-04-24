import React from "react"
import GeneralWarningModal from "./StandardLayout/GeneralWarningModal/GeneralWarningModal"
import ConfirmCloseFileModal from "./StandardLayout/ConfirmCloseFileModal/ConfirmCloseFileModal"
import SaveFileAsModal from "./StandardLayout/SaveFileAsModal/SaveFileAsModal"
import CompilationErrorModal from "./StandardLayout/CompilationErrorModal.tsx/CompilationErrorModal"
import LoadPopUp from "./ManageFilesModals/LoadModal/LoadPopUp"
import ManagePopUp from "./ManageFilesModals/ManageModal/ManagePopUp"
import SavePopUp from "./ManageFilesModals/SaveModal/SavePopUp"

interface EditorModalWarperInterface {

}

export default function EditorModalWarper(props: EditorModalWarperInterface) {

    return (
        <div>
            <GeneralWarningModal />
            <ConfirmCloseFileModal />
            <SaveFileAsModal />
            <CompilationErrorModal />

            <LoadPopUp />
            <SavePopUp />
            <ManagePopUp />
        </div>
    )
}


