//TMP

enum ModalType {
    GeneralModal = 1,
    SaveAsModal,
    ConfirmCloseModal,
    CompilationErrorModal,
    SaveModal,
    LoadModal,
    ManageErrorModal
}

enum ModalDegree {
    Neuter,
    Caution,
    Error,
    Active,
    Default
}

interface ModalAction {
    name: string;
    degree: ModalDegree;
    callback: Function;
}

interface ModalsState {
    modalList: Array<boolean>;
}

function getModalState(modalId: ModalType): boolean {
    
    return;
}

export { ModalType, ModalDegree };
export type { ModalAction };

