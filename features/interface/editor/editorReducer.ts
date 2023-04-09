import { combineReducers } from "redux"

import editorModalReducers from "features/interface/editor/editorModalsSlice"

const reducer = combineReducers({
    modals: editorModalReducers,
})

export default reducer;

