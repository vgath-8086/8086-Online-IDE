import { v4 as uuidv4 } from 'uuid';

type SourceFile = {
    id: string,
    name: string,
    content:string,
    creationDate: string,
    lastSave: string,
}

const defaultContent:string = '\r\norg 0h\r\n\r\nret\r\nret';
const untitledRegex:RegExp = /^untitled(-([0-9]+))?$/;
const emptyRegex:RegExp = new RegExp("^((\n|\s|\t| )*|" + defaultContent + ")$", 'i');

const test__DefaultFile:SourceFile = {
    id: '0',
    name: 'testFile.asm',   
    content: defaultContent,
    creationDate: '',
    lastSave: '',
};

class FileManagement {

    static defaultUntitled:string = 'untitled';
    static untitledRegex:RegExp = untitledRegex;
    static emptyRegex:RegExp = emptyRegex;

    static newSourceFile(name:string, content:string, id?:string): SourceFile {

        const currentDate:string = new Date().toDateString();

        if (!id) id = uuidv4();
        
        return {
            id: id,
            name: name,   //TODO: change the default naming: untitled-0, untitled-1
            content: content,
            creationDate: currentDate,
            lastSave: currentDate,
        };
    }

    //Note: it would be better if we had some sort of counter in a class to register every untitled file 
    static generateUntitledName(fileList:SourceFile[]): string {

        //We first look for all the untitled files
        const untitledFiles:SourceFile[] = fileList.filter(

            file => FileManagement.untitledRegex.test(file.name)    
        )
        const cardinalsList:number[] = []
        
        //We look for all the used cardinals
        for (const file of untitledFiles) {

            if (file.name == FileManagement.defaultUntitled) {

                cardinalsList.push(0)
            }
            else {

                const fileCardinal = /[0-9]+/.exec(file.name)[0]

                cardinalsList.push(parseInt(fileCardinal, 10))
            }
        }

        cardinalsList.sort()

        //We retrieve the first unused cardinal
        const cardinal:number = getFreeCardinal(cardinalsList),
              name:string = `${this.defaultUntitled}-${cardinal}`

        return name;


        //https://stackoverflow.com/questions/35603490/get-first-minimum-free-integer-key-id-in-array-of-integer
        //Get first minimum free integer key/id in array of integer
        function getFreeCardinal(array: number[]): number {
            let start = 0;

            array.every( (a) => {
                if (start === a) {
                    start = a + 1;
                    return true;
                }
            });
            return start;
        }
    }
}

export type { SourceFile };
export { defaultContent, test__DefaultFile, FileManagement };
