import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface EditorModalState {
    lastCompilationOutput: any,
    breakPoint: any,
}

const initialState:EditorModalState = {
    lastCompilationOutput: null,
    breakPoint: null,
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
