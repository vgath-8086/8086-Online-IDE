
type SourceFile = {
    id: string,
    name: string,
    content:string,
    creationDate: string,
    lastSave: string,
}

const defaultContent:string = '\r\norg 0h\r\n\r\nret\r\n';

const test__DefaultFile:SourceFile = {
    id: '0',
    name: 'testFile.asm',   
    content: defaultContent,
    creationDate: '',
    lastSave: '',
};

export type { SourceFile };
export { defaultContent, test__DefaultFile };
