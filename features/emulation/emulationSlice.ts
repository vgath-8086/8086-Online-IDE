import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ExecutionState } from "../../definitions/Emulation"

interface EmulationState {
    executionState: ExecutionState
}

const initialState: EmulationState = {
    executionState: ExecutionState.IDLE,
}

//=======================================================================================================

export const processorSlice = createSlice({
    name: 'emulation',
    initialState,
    reducers: {
        setExecutionState: (state, action: PayloadAction<ExecutionState>) => {
            state.executionState = action.payload;
        },
        
        
    }
})

//export const { singleStep, backStep } = processorSlice.actions

export default processorSlice.reducer