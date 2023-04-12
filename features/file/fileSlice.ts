import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

import  { defaultContent, FileManager, test__DefaultFile } from 'definitions/File'
import type { SourceFile } from 'definitions/File'

import editorModalsSlice from 'features/interface/editor/editorModalsSlice'

interface FilesState {
    files: SourceFile[],
    openedFiles: string[],
    savedFiles: string[],
    activeFile: string|null,
    fileToSave: string,
}

const initialState:FilesState = {
    files: [test__DefaultFile],
    openedFiles: ['0'],
    savedFiles: ['0'],
    activeFile: '0',
    fileToSave: '',
}

//=======================================================================================================

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {

        //open a close saved file
        loadFile: (state, action: PayloadAction<string>) => {
            const index: string = action.payload;
            
            if (state.openedFiles.indexOf(index) == -1 && state.savedFiles.indexOf(index) != -1) {
                
                state.openedFiles.push(index);
                state.activeFile = index;            
            }
            else {
                console.warn("Trying to load already openend file or unsaved file, index:" + index); 
            }
        },

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

            console.log(state.files);
            
        },

        //Switch to a new file when clicking on a TabBarElement
        switchFile: (state, action: PayloadAction<string>) => {
            const index: string = action.payload;

            state.activeFile = index
        },

        //Update file content as we write in it
        updateActiveFileContent: (state, action: PayloadAction<string>) => {
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

        //TO DO: We should verify here if the name is not already taken
        updateFileName: (state, action: PayloadAction<{newName:string, index:string}>) => {
            let {index, newName} = action.payload;

            //Quick fix if the user provided an empty string
            if (newName.length == 0) {
                newName = `up-${state.files.find(file => file.id == index).name}`;
            }
            
            state.files.find(file => file.id == index).name = newName; 
        },

        saveFile: (state, action: PayloadAction<string>) => {
            let index = action.payload;

            state.savedFiles.push(index); 
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
        },

        //VERY TMP, should review urgently
        //Delete file from filelist and opened file
        deleteFile: (state, action: PayloadAction<string>) => {
            const index: string = action.payload;

            const deletePosition: number = FileManager.findFilePosition(state.files, index);
            console.log(deletePosition, index);
            
            state.files.splice( deletePosition, 1);

            const savedIndex: number = state.savedFiles.indexOf(index);

            //If the file is saved, we remove it from the saved list
            if (savedIndex != -1) {

                state.savedFiles.splice( savedIndex, 1);
            }

            const openedIndex: number = state.openedFiles.indexOf(index);

            //If the file is not opened, we terminate here
            if (!openedIndex) {
                return;
            }

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
        },

        setFileToSave: (state, action: PayloadAction<string>) => {

            state.fileToSave = action.payload
        },

        clearFileToSave: (state) => {

            state.fileToSave = ''
        },
    }
})

export const { createFile , loadFile, switchFile, updateActiveFileContent, updateFileName,
saveFile, closeFile, deleteFile, setFileToSave, clearFileToSave } = fileSlice.actions

export type { FilesState }
export default fileSlice.reducer
