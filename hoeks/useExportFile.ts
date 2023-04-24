import { useSelector } from "react-redux"
import { SourceFile, FileManager } from "definitions/File"

const useExportFile = () => {

    const files:SourceFile[] = useSelector((state:any) => state.fileSystem.files),
          activeFile:string = useSelector((state:any) => state.fileSystem.activeFile)

    const handleExportFile = (fileId:string=null) => {
        
        const index = fileId != null ? fileId: activeFile,
              file = FileManager.findFile(files, index)

        FileManager.exportFile(file)
    }

    return [handleExportFile]
}

export default useExportFile
