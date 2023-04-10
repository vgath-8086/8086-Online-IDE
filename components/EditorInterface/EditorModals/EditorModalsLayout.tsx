import React from "react"
import EditorCloseUnsavedFile from "./EditorCloseUnsavedFile"
import EditorCompilationModal from "./EditorCompilationModal"
import EditorSaveFileAs from "./EditorSaveFileAs"

interface EditorLayoutInterface {

}

export default function EditorLayout(props: EditorLayoutInterface) {

    return (
        <div>
            <EditorCloseUnsavedFile />
            <EditorCompilationModal />
            <EditorSaveFileAs />
        </div>
    )
}


