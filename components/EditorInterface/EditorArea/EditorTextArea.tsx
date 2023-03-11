import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import okaidia from '@uiw/codemirror-theme-okaidia';

import StreamParserAsm86 from 'definitions/CodeMirror/StreamParserAsm86'
import ThemeLightBase16 from 'definitions/CodeMirror/ThemeLightBase16'
import { SourceFile } from 'definitions/File';
import { updateFileContent } from "features/file/fileSlice"

interface EditorTextAreaInterface {

}

const asmLang = StreamLanguage.define(StreamParserAsm86);

export default function EditorTextArea(props: EditorTextAreaInterface) {

  const files:SourceFile[] = useSelector((state:any) => state.fileSystem.files),
        activeFile:string = useSelector((state:any) => state.fileSystem.activeFile);
  
  const currentFile:SourceFile = files.find(file => file.id == activeFile);
  
  //If no activeFile was found, we display an empty editor
  let initContent:string = currentFile ? currentFile.content : '';

  const dispatch = useDispatch();
  
  const defaultText = '\r\norg 0h\r\n\r\nret\r\n';

  const onChange = React.useCallback((value, viewUpdate) => {
    dispatch(updateFileContent(value))
  }, []);

  return (
    <div style={{flex: 1, maxHeight: "100%"}}>
      <CodeMirror
        value={initContent}
        theme={ThemeLightBase16}
        extensions={[asmLang]}
        height={"100%"}
        onChange={onChange}
        style={{fontSize: "16px", outlineStyle: "none", height:"100%",
        boxShadow: "none", borderColor: "transparent", outline: "none" }}
      />
    </div>

  );
}