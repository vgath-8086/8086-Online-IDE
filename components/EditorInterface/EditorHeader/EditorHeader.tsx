import React from "react"
import LogoBar from "./LogoBar"
import FileMenu from "./FilesMenu"
import ExamplesMenu from "./ExamplesMenu"

import styles from "styles/EditorInterface/EditorHeader.module.scss"

interface EditorHeaderInterface {

}

export default function EditorHeader(props: EditorHeaderInterface) {

    return (
        <header className={styles.header}>
            <LogoBar />

            <div className={styles.nav}>
                <div className={styles.navButtonContainer}>
                    <button className={styles.navButton}>
                        <img className={styles.navIcon} src="icons/header/icon_file_management.svg" alt="icon file management" />
                        <span className={styles.navButtonName}>Files</span>
                    </button>
                    <div className={styles.fileScrollingMenu}>
                        <div className={styles.test}>&nbsp;</div>
                        <FileMenu/>
                    </div>
                </div>


                <button className={styles.navButton}>
                    <img className={styles.navIcon} src="icons/header/icon_manual.svg" alt="icon manual" />
                    <span className={styles.navButtonName}>Manual</span>
                </button>

                <button className={styles.navButton}>
                    <img className={styles.navIcon} src="icons/header/icon_asm_ref.svg" alt="icon asm ref" />
                    <span className={styles.navButtonName}>ASM-Reference</span>
                </button>

                <div className={styles.navButtonContainer}>
                    <button className={styles.navExampleButton}>
                        <img className={styles.navIcon} src="icons/header/icon_examples_down_arrow.svg" alt="examples down arrow" />
                        <span className={styles.navExampleButtonName}>Examples</span>
                    </button>
                    <div className={styles.examplesScrollingMenu}>
                        <div className={styles.test}>&nbsp;</div>
                        <ExamplesMenu/>
                    </div>
                </div>

                <button className={styles.compileButton}>
                    <img className={styles.navIcon} src="icons/header/icon_compile.svg" alt="icon compile button" />
                    <span className={styles.compileButtonName}>Compile</span>
                </button>
            </div>
        </header>
    )
}


