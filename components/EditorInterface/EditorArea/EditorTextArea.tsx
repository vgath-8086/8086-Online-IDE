import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import okaidia from '@uiw/codemirror-theme-okaidia';

import { ModalType } from 'definitions/Modals';
import { SourceFile } from 'definitions/File';
import StreamParserAsm86 from 'definitions/CodeMirror/StreamParserAsm86'
import ThemeLightBase16 from 'definitions/CodeMirror/ThemeLightBase16'

import { updateFileContent } from "features/file/fileSlice"
import { setFileToSave, openModal } from "features/interface/editor/editorModalsSlice"

import {EditorView, gutter, GutterMarker} from "@codemirror/view"
import {StateField, StateEffect, RangeSet} from "@codemirror/state"


const breakpointMarker = new class extends GutterMarker {
  toDOM() { return document.createTextNode("💔") }
}

const breakpointEffect = StateEffect.define<{pos: number, on: boolean}>({
  map: (val, mapping) => ({pos: mapping.mapPos(val.pos), on: val.on})
})

const breakpointState = StateField.define<RangeSet<GutterMarker>>({
  create() { return RangeSet.empty },
  update(set, transaction) {
    set = set.map(transaction.changes)
    for (let e of transaction.effects) {
      if (e.is(breakpointEffect)) {
        if (e.value.on)
          set = set.update({add: [breakpointMarker.range(e.value.pos)]})
        else
          set = set.update({filter: from => from != e.value.pos})
      }
    }
    return set
  }
})

function toggleBreakpoint(view: EditorView, pos: number) {
  let breakpoints = view.state.field(breakpointState)
  let hasBreakpoint = false
  breakpoints.between(pos, pos, () => {hasBreakpoint = true})
  view.dispatch({
    effects: breakpointEffect.of({pos, on: !hasBreakpoint})
  })
}
const breakpointGutter = [
  breakpointState,
  gutter({
    class: "cm-breakpoint-gutter",
    markers: v => v.state.field(breakpointState),
    initialSpacer: () => breakpointMarker,
    domEventHandlers: {
      mousedown(view, line) {
        toggleBreakpoint(view, line.from)
        return true
      }
    }
  }),
  EditorView.baseTheme({
    ".cm-breakpoint-gutter .cm-gutterElement": {
      color: "red",
      paddingLeft: "2px",
      cursor: "default"
    }
  })
]


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
  
  const onChange = React.useCallback((value, viewUpdate) => {
    
    dispatch(updateFileContent({index: null, newContent: value}))
  }, []);

  const onKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      // Prevent the Save dialog to open
      e.preventDefault();
      
      //TODO: implement a correct save solution once the "saving system" is completed
      //if (FileManager.isUntitled(currentFile)) {

        dispatch(setFileToSave(currentFile.id))
        dispatch(openModal(ModalType.SaveAsModal))
      
      //if (FileManager.isUntitled(currentFile)) {

      //}

      /*}
      else  {

      }*/
	  //dispatch()
    }
  }

  return (
    <div style={{flex: 1, maxHeight: "100%"}}>
      <CodeMirror
        value={initContent}
        theme={ThemeLightBase16}
        extensions={[asmLang]}
        height={"100%"}
        onChange={onChange}
		    onKeyDown={onKeyDown}
        style={{fontSize: "16px", outlineStyle: "none", height:"100%",
        boxShadow: "none", borderColor: "transparent", outline: "none" }}
      />
    </div>

  );
}