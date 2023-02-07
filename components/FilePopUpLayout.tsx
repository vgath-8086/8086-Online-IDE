import React, { FC, ReactNode, useState } from "react"
import styles from "styles/popUp.module.scss"

//The FC attributes have to be warped in the <></> tag

interface FilePopUpLayoutInterface {
    headerTitle: string,
    headerIcon: {src: string, alt:string};
    listItems: Array<ReactNode>;
    footer: ReactNode; 
}

export default function FilePopUpLayout(props: FilePopUpLayoutInterface) {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerContent}>
                        <img className={styles.icon} src={props.headerIcon.src} alt={props.headerIcon.alt} />
                        <div className={styles.headerTitle}>
                            {props.headerTitle}
                        </div>
                    </div>                    
                </div>
                <div className={styles.list}>
                    {props.listItems.map((itemContent)=>(
                        <div className={styles.item}>
                            {itemContent}
                        </div>
                    ))}
                </div>


                <div className={styles.footer}>
                    {props.footer}
                </div>
            </div>
        </div>
    )
}
