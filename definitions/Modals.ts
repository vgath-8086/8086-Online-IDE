//TMP

enum ModalId {
    GeneralModal = 1,
    SaveAsModal,
    ConfirmCloseModal,
    CompilationErrorModal,
    SaveModal,
    LoadModal,
    ManageErrorModal
}

interface ModalsState {
    modalList: Array<boolean>;
}

function getModalState(modalId: ModalId): boolean {
    
    return;
}

export { ModalId }
