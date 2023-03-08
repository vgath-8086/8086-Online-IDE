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
    activeFile: '0',
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
                name: 'untitled' + fileUuid[0] + fileUuid[1],   //TODO: change the default naming: untitled-0, untitled-1
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
        */

        //Switch to a new file when clicking on a TabBarElement
        switchFile: (state, action: PayloadAction<string>) => {
            const index: string = action.payload;

            state.activeFile = index
        },

        //When an untitled empty file is closed, it shall be deleted 
        closeFile: (state, action: PayloadAction<string>) => {
            const   index: string = action.payload,

                    untitledRegex: RegExp = /^untitled[0-9]*$/,
                    emptyRegex: RegExp = /^(\n|\s|\t| )*$/; 

            //We remove the file from the openedFiles list
            const openedIndex: number = state.openedFiles.indexOf(index);
            
            state.openedFiles.splice( openedIndex, 1);

            //If the file is active, then we pass the active state to a new file
            if (state.activeFile == index) {

                //If there are no more openedFile
                if (state.openedFiles.length == 0) {

                    state.activeFile = null;
                }

                //If the closed file is not the left most child of the TabBar, we take its left sister component
                if (openedIndex != 0) {

                    state.activeFile = state.openedFiles[openedIndex-1]
                }
                else {

                    state.activeFile = state.openedFiles[openedIndex+1]
                }
            }

            //If the file is an untitled empty file, it shall be deleted
            const emptyFile:SourceFile = state.files.filter((file) => file.id == index)[0];

            if (emptyFile.name.match(untitledRegex) && emptyFile.content.match(emptyRegex)) {

                state.files = state.files.filter((file) => file.id != index);
            }
        }

    }
})

export const { createFile /*,openFile*/, switchFile, closeFile } = fileSlice.actions
export type { FilesState }
export default fileSlice.reducer
