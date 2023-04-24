import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType, ModalsState, initialModalsState } from "definitions/Modals";


interface EditorModalState {
    fileToSave: string;
    warningMessage: string;   //TODO: create a standard error popup
    modalPipLine: Function[];
    modalsOpenState: ModalsState;
}

const initialState:EditorModalState = {
    modalPipLine: [],
    modalsOpenState: initialModalsState,
    fileToSave: '',
    warningMessage: 'We cannot import the file. The file is too heavy. Please retry with a ligther file.',
}

//=======================================================================================================

export const editorModalSlice = createSlice({
    name: 'editorModal',
    initialState,
    reducers: {

        //=========================
        //TEST-TMP
        openModal: (state, action: PayloadAction<ModalType>) => {
            
            const modalType:ModalType = action.payload

            state.modalsOpenState[modalType] = true
        },

        closeModal: (state, action: PayloadAction<ModalType>) => {
            
            const modalType:ModalType = action.payload

            state.modalsOpenState[modalType] = false
        },

        //==========================
        //We be used for when clicking on the modal's overlay
        closeAllModals: (state) => {

        },

        //==========================
        setFileToSave: (state, action: PayloadAction<string>) => {

            state.fileToSave = action.payload
        },

        clearFileToSave: (state) => {

            state.fileToSave = ''
        },

        pushJobToPipeLine: (state, action: PayloadAction<Function>) => {

            state.modalPipLine.push(action.payload)
        },

        shiftJobOutPipeLine: (state) => {

            state.modalPipLine.shift()
        },
    }
})

export const {  
                openModal, closeModal,
                setFileToSave, clearFileToSave,
                pushJobToPipeLine, shiftJobOutPipeLine

             } = editorModalSlice.actions
export type { EditorModalState }
export default editorModalSlice.reducer

