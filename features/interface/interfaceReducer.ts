import { combineReducers } from "redux"

import editorReducers from "features/interface/editor/editorReducer"

const reducer = combineReducers({
    editor: editorReducers,
})

export default reducer;

