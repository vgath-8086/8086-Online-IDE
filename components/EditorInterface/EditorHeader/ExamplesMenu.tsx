import React, { useState } from "react"
import { useDispatch } from "react-redux"
import cn from "classnames"

import Examples from "definitions/Examples"
import { createFile } from "features/file/fileSlice"

import styles from "styles/EditorInterface/EditorScrollingMenus.module.scss"

interface ExamplesMenuInterface {

}

export default function ExamplesMenu(props: ExamplesMenuInterface) {

    const disptach = useDispatch();
    
    const handleLoadButton = (exampleContent:string) => {

        disptach(createFile(exampleContent))
    }
    
    return (
        <div className={styles.FileMenuContainer}>
            <div className={styles.mainList}>
                {Examples.map((example:{name: string, content:string}, idx) => (
                    <div 
                        key={idx}
                        className={styles.listElement}
                        onClick={()=>handleLoadButton(example.content)}
                    >
                        <button className={cn([styles.button])}>
                            {example.name}
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}




