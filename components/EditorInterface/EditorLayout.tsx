import React from "react"

import EditorTabBar from "./EditorTabBar/EditorTabBar"
import EditorTextArea from "./EditorArea/EditorTextArea"
import EditorFooter from "./EditorFooter/EditorFooter"
import EditorHeader from "./EditorHeader/EditorHeader"
import EditorModalsLayout from "./EditorModals/EditorModalsLayout"

import Modal from 'react-modal';

interface EditorLayoutInterface {

}

export default function EditorLayout(props: EditorLayoutInterface) {

    return (
        <div style={{height: "100%", display: "flex", "flexDirection": "column"}}>
            <EditorHeader />
            <EditorTabBar />
            <EditorTextArea />
            <EditorFooter />

            <EditorModalsLayout />
        </div>
    )
}


