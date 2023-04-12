import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "definitions/Modals";


interface EditorModalState {
    isUnsavedFileModalOpen: boolean;
    isSaveAsModalOpen: boolean;
    isGeneralWarningModalOpen:boolean;
    isCompilationErrorModalOpen: boolean;
    isErrorModalOpen: boolean;
    isLoadModalOpen: boolean;
    isSaveModalOpen: boolean;
    isManageModalOpen: boolean;

    warningMessage: string;   //TODO: create a standard error popup
}

const initialState:EditorModalState = {
    isUnsavedFileModalOpen: false,
    isSaveAsModalOpen: false,
    isGeneralWarningModalOpen: false,
    isCompilationErrorModalOpen: false,
    
    isErrorModalOpen: false,
    isLoadModalOpen: false,
    isSaveModalOpen: false,
    isManageModalOpen: false,

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
            
            const modalId:ModalType = action.payload

            switch( modalId ) {

                case ModalType.ConfirmCloseModal:
                    state.isUnsavedFileModalOpen = true;
                    break;

                default:
            }
        },
        //=========================

        //Save As File Modal
        openGeneralWarningModal: (state) => {

            state.isGeneralWarningModalOpen = true;
        },
        
        closeGeneralWarningModal: (state) => {
            
            state.isGeneralWarningModalOpen = false;
        },

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

        //Save As File Modal
        openCompilationErrorModal: (state) => {

            state.isCompilationErrorModalOpen = true;
        },
        
        closeCompilationErrorModal: (state) => {
            
            state.isCompilationErrorModalOpen = false;
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
                openGeneralWarningModal, closeGeneralWarningModal,
                openLoadModal, closeLoadModal,
                openSaveModal, closeSaveModal,
                openManageModal, closeManageModal,
                openCompilationErrorModal, closeCompilationErrorModal,
             } = editorModalSlice.actions
export type { EditorModalState }
export default editorModalSlice.reducer

