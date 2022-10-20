import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { SourceFile } from '../../definitions/File';

interface FileState {
    files: SourceFile[],
    openedFiles: number[],
    activeFile: number|null,
}

const initialState:FileState = {
    files: [],
    openedFiles: [],
    activeFile: null,
}

//=======================================================================================================

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        //As soon as a file is opened, it shall be saved onto the state/localStorage
        openFile: (state, action: PayloadAction<SourceFile>) => {
            const index: number = state.files.length + 1;

            state.files.push(action.payload);
            state.openedFiles.push(index);
        },

        //When an untitled empty file is closed, it shall be deleted 
        closeFile: (state, action: PayloadAction<number>) => {
            const   index: number = action.payload,

                    untitledRegex: RegExp = /^untitled[0-9]*$/,
                    emptyRegex: RegExp = /^(\n|\s|\t| )*$/; 

            //We remove the file from the openedFiles list
            const openedIndex: number = state.openedFiles.indexOf(index);
            
            state.openedFiles.splice( openedIndex, 1);

            //If the file is an untitled empty file, it shall be deleted
            const   title = state.files[index].name,
                    content = state.files[index].content;
                  
            if (title.match(untitledRegex) && content.match(emptyRegex)) {
                state.files.splice(index, 1);
            }
        }

    }
})

export const { openFile, closeFile } = fileSlice.actions

export default fileSlice.reducer