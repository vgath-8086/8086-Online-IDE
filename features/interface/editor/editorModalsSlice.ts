import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface EditorModalState {
    isUnsavedFileModalOpen: boolean;
    isSaveAsModalOpen: boolean;
    isErrorModalOpen: boolean;

    errorMessage: string;   //TODO: create a standart error popup
}

const initialState:EditorModalState = {
    isUnsavedFileModalOpen: false,
    isSaveAsModalOpen: false,
    isErrorModalOpen: false,
    errorMessage: '',
}

//=======================================================================================================

export const editorModalSlice = createSlice({
    name: 'editorModal',
    initialState,
    reducers: {

        //Unsaved File Modal
        openUnsavedFileModal: (state) => {
            
            state.isUnsavedFileModalOpen = true;
        },
        
        closeUnsavedFileModal: (state, action: PayloadAction<any>) => {
            
            state.isUnsavedFileModalOpen = false;
        },

        //Save As File Modal
        openSaveAsModal: (state) => {
    
            state.isSaveAsModalOpen = true;
        },
        
        closeSaveAsModal: (state) => {
            
            state.isSaveAsModalOpen = false;
        }

    }
})

export const { openUnsavedFileModal, closeUnsavedFileModal, openSaveAsModal, closeSaveAsModal } = editorModalSlice.actions
export type { EditorModalState }
export default editorModalSlice.reducer

