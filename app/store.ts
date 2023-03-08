import { configureStore } from "@reduxjs/toolkit"

import fileReducers from "features/file/fileSlice"

export const store = configureStore({
    reducer: {
        fileSystem: fileReducers,
    }
})