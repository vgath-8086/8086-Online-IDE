import React from "react"
import LogoBar from "./LogoBar"

import styles from "styles/EditorInterface/EditorHeader.module.scss"

interface EditorHeaderInterface {

}

export default function EditorHeader(props: EditorHeaderInterface) {

    return (
        <header className={styles.header}>
            <LogoBar />

            <div className={styles.nav}>
                <button className={styles.navButton}>
                    <img className={styles.navIcon} src="icons/header/icon_file_management.svg" alt="icon file management" />
                    <span className={styles.navButtonName}>Files</span>
                </button>

                <button className={styles.navButton}>
                    <img className={styles.navIcon} src="icons/header/icon_manual.svg" alt="icon manual" />
                    <span className={styles.navButtonName}>Manual</span>
                </button>

                <button className={styles.navButton}>
                    <img className={styles.navIcon} src="icons/header/icon_asm_ref.svg" alt="icon asm ref" />
                    <span className={styles.navButtonName}>ASM-Reference</span>
                </button>

                <button className={styles.navExampleButton}>
                    <img className={styles.navIcon} src="icons/header/icon_examples_down_arrow.svg" alt="examples down arrow" />
                    <span className={styles.navExampleButtonName}>Examples</span>
                </button>

                <button className={styles.compileButton}>
                    <img className={styles.navIcon} src="icons/header/icon_compile.svg" alt="icon compile button" />
                    <span className={styles.compileButtonName}>Compile</span>
                </button>
            </div>
        </header>
    )
}


