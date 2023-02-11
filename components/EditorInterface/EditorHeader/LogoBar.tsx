import React from "react"

import styles from "styles/EditorHeader.module.scss"

interface LogoBarInterface {

}

export default function LogoBar(props: LogoBarInterface) {

    return (
        <div className={styles.logoContainer}>
            <div className={styles.logoContent}>
                <img className={styles.logoIcon} src="icons/logo_blue.svg" alt="logo vgath" />
                <h1 className={styles.logoTitle}>Vgath-8086</h1>
            </div>
            <div className={styles.emptyUtilDiv}>&nbsp;</div>{/*A quick fix to prevent the box-shadows from overlapping */}
            <img className={styles.vagunette} height="120px" src="icons/header/vagunette_deco.svg" alt="decoration web site" />
        </div>
    );
}