import { configureStore } from "@reduxjs/toolkit"

import fileReducers from "features/file/fileSlice"
import editorModalReducers from "features/interface/interfaceReducer"

export const store = configureStore({
    reducer: {
        fileSystem: fileReducers,
        interfaceManagement: editorModalReducers,
    }
})