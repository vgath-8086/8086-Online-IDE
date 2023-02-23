import React from "react"

import EditorTabBar from "./EditorArea/EditorTabBar/EditorTabBar"
import EditorTextArea from "./EditorArea/EditorTextArea"
import EditorFooter from "./EditorFooter/EditorFooter"
import EditorHeader from "./EditorHeader/EditorHeader"

interface EditorLayoutInterface {
    
}

export default function EditorLayout(props: EditorLayoutInterface) {

    return (
        <div style={{height: "100%", display: "flex", "flexDirection": "column"}}>
            <EditorHeader />
            <EditorTabBar />
            <EditorTextArea />
            <EditorFooter />
        </div>
    )
}


