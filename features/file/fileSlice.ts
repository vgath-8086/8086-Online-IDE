import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

import  { defaultContent, test__DefaultFile } from 'definitions/File';
import type { SourceFile } from 'definitions/File';

interface FilesState {
    files: SourceFile[],
    openedFiles: string[],
    activeFile: string|null,
}

const initialState:FilesState = {
    files: [test__DefaultFile],
    openedFiles: ['0'],
    activeFile: null,
}

//=======================================================================================================

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {

        //Create a new file when clicking on the "plus" button
        createFile: (state) => {
            const currentDate:string = new Date().toDateString(),
                  fileUuid:string = uuidv4();
            
            let createdFile:SourceFile = {
                id: fileUuid,
                name: 'untitled',   //TODO: change the default naming: untitled-0, untitled-1
                content: defaultContent,
                creationDate: currentDate,
                lastSave: currentDate,
            };

            state.files.push(createdFile);
            state.openedFiles.push(fileUuid);
            state.activeFile = fileUuid;
        },

        /*
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
        */

    }
})

export const { createFile /*,openFile, closeFile*/ } = fileSlice.actions
export type { FilesState }
export default fileSlice.reducer
