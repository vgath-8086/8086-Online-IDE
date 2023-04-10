import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

import  { defaultContent, FileManager, test__DefaultFile } from 'definitions/File'
import type { SourceFile } from 'definitions/File'

import editorModalsSlice from 'features/interface/editor/editorModalsSlice'

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
            const fileName:string = FileManager.generateUntitledName(state.files),
                  currentDate:string = new Date().toDateString(),
                  fileUuid:string = uuidv4();
            
            let createdFile:SourceFile = {
                id: fileUuid,
                name: fileName,   //TODO: change the default naming: untitled-0, untitled-1
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

        //Update file content as we write in it
        updateFileContent: (state, action: PayloadAction<string>) => {
            const newContent:string = action.payload;

            if (state.activeFile) {

                state.files.find(file => file.id == state.activeFile).content = newContent; // Check this line
            }
            //If there is no active file, we create a new untitled file
            else {
                const fileName:string = FileManager.generateUntitledName(state.files),
                      createdFile:SourceFile = FileManager.newSourceFile(fileName, newContent);

                state.files.push(createdFile);
                state.openedFiles.push(createdFile.id);
                state.activeFile = createdFile.id;
            }
        },

        //When an untitled empty file is closed, it shall be deleted 
        closeFile: (state, action: PayloadAction<string>) => {
            const   index: string = action.payload,

                    untitledRegex: RegExp = FileManager.untitledRegex,
                    emptyRegex: RegExp = FileManager.emptyRegex; 

            //We remove the file from the openedFiles list
            const openedIndex: number = state.openedFiles.indexOf(index);
            
            //Closing the file
            state.openedFiles.splice( openedIndex, 1);

            //If the file is active, then we pass the active state to a new file
            if (state.activeFile == index) {

                //If there are no more openedFile
                if (state.openedFiles.length == 0) {

                    state.activeFile = null;
                }
                
                //If the closed file is not the right most child of the TabBar, we take its right sister component
                if (openedIndex != state.openedFiles.length) {

                    state.activeFile = state.openedFiles[openedIndex]
                }
                else {

                    state.activeFile = state.openedFiles[openedIndex-1]
                }
            }

            //If the file is an untitled empty file, it shall be deleted
            const currentFile:SourceFile = state.files.filter((file) => file.id == index)[0];

            if (FileManager.isUntitled(currentFile) && FileManager.isEmpty(currentFile)) {

                state.files = state.files.filter((file) => file.id != index);
            }
        }

    }
})

export const { createFile /*,openFile*/, switchFile, updateFileContent, closeFile } = fileSlice.actions
export type { FilesState }
export default fileSlice.reducer
