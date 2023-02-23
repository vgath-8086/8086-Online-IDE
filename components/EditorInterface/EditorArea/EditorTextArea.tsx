import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import okaidia from '@uiw/codemirror-theme-okaidia';

import StreamParserAsm86 from 'definitions/CodeMirror/StreamParserAsm86'
import ThemeLightBase16 from 'definitions/CodeMirror/ThemeLightBase16'

interface EditorTextAreaInterface {

}

const asmLang = StreamLanguage.define(StreamParserAsm86);

export default function EditorTextArea(props: EditorTextAreaInterface) {

  const defaultText = '\r\norg 0h\r\n\r\nret\r\n';

  const onChange = React.useCallback((value, viewUpdate) => {
    console.log('value:', value);
  }, []);

  return (
    <div style={{flex: 1, maxHeight: "100%"}}>
      <CodeMirror
        value={defaultText}
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