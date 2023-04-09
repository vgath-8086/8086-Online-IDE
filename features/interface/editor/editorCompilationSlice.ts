import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface EditorModalState {
    lastCompilationOutput: any,
}

const initialState:EditorModalState = {
    lastCompilationOutput: null,
}

//=======================================================================================================

export const editorCompilationSlice = createSlice({
    name: 'editorCompilation',
    initialState,
    reducers: {


    }
})

export const {  } = editorCompilationSlice.actions
export type { EditorModalState }
export default editorCompilationSlice.reducer
