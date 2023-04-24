//TMP

enum ModalType {
    GeneralModal = 1,
    SaveAsModal,
    ConfirmCloseModal,
    CompilationErrorModal,

    ErrorModal,
    SaveModal,
    LoadModal,
    ManageModal,
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

type ModalsState = { [type in ModalType]: boolean };
const initialModalsState: ModalsState = {
    [ModalType.GeneralModal]: false,
    [ModalType.SaveAsModal]: false,
    [ModalType.ConfirmCloseModal]: false,
    [ModalType.CompilationErrorModal]: false,

    [ModalType.ErrorModal]: false,
    [ModalType.SaveModal]: false,
    [ModalType.LoadModal]: false,
    [ModalType.ManageModal]: false,
}


function getModalState(modalId: ModalType): boolean {
    
    return;
}

export { ModalType, ModalDegree, initialModalsState };
export type { ModalAction, ModalsState };

