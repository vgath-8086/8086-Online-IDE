import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { SourceFile } from "definitions/File"

enum ListItemFilterBy{
    openFiles,
    savedFiles
}

const useGetFileListItem = (filterBy: ListItemFilterBy) => {

    const files:SourceFile[] = useSelector((state:any) => state.fileSystem.files)
    
    var filterIndices: string[]

    switch (filterBy) {

        case ListItemFilterBy.savedFiles:
            filterIndices = useSelector((state:any) => state.fileSystem.savedFiles)
            break;
        
        case ListItemFilterBy.openFiles:
            filterIndices = useSelector((state:any) => state.fileSystem.openedFiles)
            break;

        default:
            console.error("Error in 'useGetFileListItem': unrecognized filter condition");
            break;
    }

    const generateListItem = (generateItem: (any) => ReactNode) => {
        
        const tabsList:ReactNode[] = [];       
        
        for (const file of files) { 

            if (filterIndices.includes( file.id )) {

                tabsList.push(generateItem(file))
            }
        }

        return tabsList
    }

    return [generateListItem]
}


export default useGetFileListItem
export { ListItemFilterBy }