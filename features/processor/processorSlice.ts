import { createSlice } from "@reduxjs/toolkit";
import Processor from '../../engine/Emulator/Processor'

interface processorState {
    processor: Processor
}


const initialState: processorState = {
    processor: new Processor()
}

export const processorSlice = createSlice({
    name: 'processor',
    initialState,
    reducers: {
        /*
        getVideoMemory() {

        }
        */
    }
})

//export const { singleStep, backStep } = processorSlice.actions

export default processorSlice.reducer