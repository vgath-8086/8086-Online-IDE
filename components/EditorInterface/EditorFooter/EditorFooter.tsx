import React from "react"

import styles from "styles/EditorInterface/EditorFooter.module.scss"

interface EditorFooterInterface {

}

export default function EditorFooter(props: EditorFooterInterface) {

    return (
        <footer className={styles.footer}>
            <span>23/02/2023 - 00:53 :</span>
            <span>File saved at './exo_1.asm'</span>
        </footer>
    )
}


