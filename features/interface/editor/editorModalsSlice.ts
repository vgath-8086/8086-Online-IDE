import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalId } from "definitions/Modals";


interface EditorModalState {
    isUnsavedFileModalOpen: boolean;
    isSaveAsModalOpen: boolean;
    isErrorModalOpen: boolean;
    isLoadModalOpen: boolean;
    isSaveModalOpen: boolean;
    isManageModalOpen: boolean;

    errorMessage: string;   //TODO: create a standart error popup
}

const initialState:EditorModalState = {
    isUnsavedFileModalOpen: false,
    isSaveAsModalOpen: false,
    isErrorModalOpen: false,
    isLoadModalOpen: false,
    isSaveModalOpen: false,
    isManageModalOpen: false,

    errorMessage: '',
}

//=======================================================================================================

export const editorModalSlice = createSlice({
    name: 'editorModal',
    initialState,
    reducers: {

        //=========================
        //TEST-TMP
        openModal: (state, action: PayloadAction<ModalId>) => {
            
            const modalId:ModalId = action.payload

            switch( modalId ) {

                case ModalId.ConfirmCloseModal:
                    state.isUnsavedFileModalOpen = true;
                    break;

                default:
            }
        },
        //=========================

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
        },

        //File Management Modals
        //)======================================================================
        //Load Modals
        openLoadModal: (state) => {
            state.isLoadModalOpen = true;
        },
        
        closeLoadModal: (state) => {
            
            state.isLoadModalOpen = false;
        },

        //Save Modal
        openSaveModal: (state) => {
            state.isSaveModalOpen = true;
        },
        
        closeSaveModal: (state) => {
            
            state.isSaveModalOpen = false;
        },

        //Manage Modal
        openManageModal: (state) => {

            state.isManageModalOpen = true;
        },
        
        closeManageModal: (state) => {
            
            state.isManageModalOpen = false;
        },

        //==========================
        //We be used for when clicking on the modal's overlay
        closeAllModals: (state) => {

        }
    }
})

export const {  openUnsavedFileModal, closeUnsavedFileModal, 
                openSaveAsModal, closeSaveAsModal,
                openLoadModal, closeLoadModal,
                openSaveModal, closeSaveModal,
                openManageModal, closeManageModal,
             } = editorModalSlice.actions
export type { EditorModalState }
export default editorModalSlice.reducer

