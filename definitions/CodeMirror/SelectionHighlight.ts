import { highlightSelectionMatches } from '@codemirror/search';
import {EditorView} from "@codemirror/view"

const selectionHighlight= [
    highlightSelectionMatches({
        wholeWords: true
    }),
    EditorView.baseTheme({
        ".cm-line .cm-selectionMatch": { // We add the .cm-line classname in order to artificially increase the cs specifity
          boxSizing: 'content-box',
          textDecoration: 'underline',
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          borderRadius: '2px',
          //padding: '2px',
          //position: 'relative',
          //left: '-2px',
          //top: '-0.5px',
        },
        ".cm-line .cm-selectionMatch span": { 
          textDecoration: 'underline',
          boxSizing: 'content-box',
        }
      })
]


export { selectionHighlight };
