import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import okaidia from '@uiw/codemirror-theme-okaidia';
import { asm86 } from 'definitions/CodeMirror/StreamParserAsm86'

import ThemeLightBase16 from 'definitions/CodeMirror/ThemeLightBase16'

interface EditorTextAreaInterface {

}

const asmLang = StreamLanguage.define(asm86);

export default function EditorTextArea(props: EditorTextAreaInterface) {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);
  return (
    <div style={{flex: 1}}>
      <CodeMirror
        value={'\r\norg 0h \r\n \r\nret\r\n'}
        height={"100%"}
        extensions={[asmLang]}
        onChange={onChange}
        theme={ThemeLightBase16}
        style={{fontSize: "16px", outlineStyle: "none", height:"100%",
        boxShadow: "none", borderColor: "transparent", outline: "none" }}
      />
    </div>

  );
}