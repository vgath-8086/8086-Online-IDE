import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

import  { defaultContent, FileManager, test__DefaultFile } from 'definitions/File'
import type { SourceFile } from 'definitions/File'

interface FilesState {
    files: SourceFile[],
    openedFiles: string[],
    savedFiles: string[],       //Note: Should change the savedFiles list into a set and manage the saving order using timestamps
    activeFile: string|null,
}

const initialState:FilesState = {
    files: [test__DefaultFile],
    openedFiles: ['0'],
    savedFiles: ['0'],
    activeFile: '0',
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
                
                const openIndex:number = state.openedFiles.indexOf(state.activeFile)
                
                if (openIndex != -1) {
                    
                    state.openedFiles.splice(openIndex+1, 0, index)
                }
                else {

                    state.openedFiles.push(index);
                }

                state.activeFile = index;            
            }
            else {
                console.warn("Trying to load already openend file or unsaved file, index:" + index); 
            }
        },

        //Create a new file when clicking on the "plus" button
        createFile: (state, action?: PayloadAction<string|null>) => {
            const content: string = action.payload
            
            const fileName:string = FileManager.generateUntitledName(state.files),
                  currentDate:string = new Date().toDateString(),
                  fileUuid:string = uuidv4();
            
            let createdFile:SourceFile = {
                id: fileUuid,
                name: fileName,   //TODO: change the default naming: untitled-0, untitled-1
                content: (content == null) ? defaultContent: content,
                creationDate: currentDate,
                lastSave: currentDate,
            };

            state.files.push(createdFile);
            state.openedFiles.push(fileUuid);
            state.activeFile = fileUuid;            
        },

        uploadFile: (state, action: PayloadAction<{content:string, name:string}>) => {
            const fileName: string = action.payload.name,
                  content: string = action.payload.content
            
            const currentDate:string = new Date().toDateString(),
                  fileUuid:string = uuidv4();
            
            let createdFile:SourceFile = {
                id: fileUuid,
                name: fileName,   //TODO: change the default naming: untitled-0, untitled-1
                content: content,
                creationDate: currentDate,
                lastSave: currentDate,
            };

            state.files.push(createdFile);
            state.openedFiles.push(fileUuid);
            state.savedFiles.push(fileUuid);
            state.activeFile = fileUuid;
        },

        //Switch to a new file when clicking on a TabBarElement
        switchFile: (state, action: PayloadAction<string>) => {
            const index: string = action.payload;

            state.activeFile = index
        },

        //TODO: try to unify the update actions into one

        //Update file content as we write in it
        updateFileContent: (state, action: PayloadAction<{newContent:string, index:string|null}>) => {
            let {index, newContent} = action.payload;

            if (index == null && !state.activeFile) {

                const fileName:string = FileManager.generateUntitledName(state.files),
                      createdFile:SourceFile = FileManager.newSourceFile(fileName, newContent);

                state.files.push(createdFile)
                state.openedFiles.push(createdFile.id)
                state.activeFile = createdFile.id            
            }
            else if (index == null && state.activeFile) {

                index = state.activeFile
            }

            state.files.find(file => file.id == state.activeFile).content = newContent; // Check this line
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

        saveFile: (state, action: PayloadAction<string|null>) => {
            let index = action.payload

            if (index == null && state.activeFile) {

                index = state.activeFile
            }

            if (!state.savedFiles.includes(index)) {

                state.savedFiles.push(index);
            }
            else {

                console.warn("File-Slice Warning: Trying to save already saved file")
            }
        },

        saveFileAs: (state, action: PayloadAction<{newName:string, index:string|null}>) => {
            let {index, newName} = action.payload;

            if (index == null && state.activeFile) {

                index = state.activeFile
            }

            if (!state.savedFiles.includes(index)) {

                state.savedFiles.push(index);
            }           

            //Quick fix if the user provided an empty string
            if (newName.length == 0) {

                newName = `up-${state.files.find(file => file.id == index).name}`;
            }
            
            state.files.find(file => file.id == index).name = newName
        },

        //When an untitled empty file is closed, it shall be deleted 
        closeFile: (state, action: PayloadAction<string>) => {
            const   index: string = action.payload

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
            console.log(savedIndex, index);

            const openedIndex: number = state.openedFiles.indexOf(index);

            //If the file is not opened, we terminate here
            if (openedIndex == -1) {
                return;
            }
            console.log(openedIndex, index);

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
    }
})

export const { createFile, uploadFile, loadFile, switchFile, updateFileContent, updateFileName,
saveFile, saveFileAs, closeFile, deleteFile} = fileSlice.actions

export type { FilesState }
export default fileSlice.reducer
