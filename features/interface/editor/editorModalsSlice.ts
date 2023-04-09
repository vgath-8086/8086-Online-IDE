import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface EditorModalState {
    isFileModalClose: boolean,
}

const initialState:EditorModalState = {
    isFileModalClose: true,
}

//=======================================================================================================

export const editorModalSlice = createSlice({
    name: 'editorModal',
    initialState,
    reducers: {

        //Main Modal
        openCloseFileModal: (state) => {
            
            state.isFileModalClose = true;
        },
        
        closeCloseFileModal: (state, action: PayloadAction<any>) => {
            
            state.isFileModalClose = false;
        }

    }
})

export const { openCloseFileModal, closeCloseFileModal  } = editorModalSlice.actions
export type { EditorModalState }
export default editorModalSlice.reducer
