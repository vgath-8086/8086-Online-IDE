import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

const ThemeLightBase16 = createTheme({
    theme: 'light',
    settings: {
      background: '#f5f5f5',
      foreground: '#202020',
      caret: '#5d00ff',
      selection: '#e0e0e0',
      selectionMatch: '#e0e0e0',
      lineHighlight: '#8a91991a',
      gutterBackground: '#fff',
      gutterForeground: '#8a919966',
    },
    styles: [
      { tag: t.comment, color: '#8080A0' },
      { tag: t.definition(t.typeName), color: '#d28445' },
      { tag: t.keyword, color: '#ac4142' },
      { tag: t.variableName, color: '#d28445' },
      { tag: t.tagName, color: '#6a9fb5' },
      { tag: t.propertyName, color: '#90a959' },
      { tag: t.operator, color: '#ac4142' },
      { tag: t.number, color: '#aa759f' },
      { tag: t.link, color: '#aa759f', textDecoration: 'underline' },


      //{ tag: t.variableName, color: '#90a959' },
      { tag: [t.string, t.special(t.brace)], color: '#f4bf75' },
      { tag: t.bool, color: '#ac4142' },
      { tag: t.null, color: '#ac4142' },

      { tag: t.className, color: '#5c6166' },
      { tag: t.typeName, color: '#5c6166' },
      { tag: t.angleBracket, color: '#5c6166' },
      { tag: t.attributeName, color: '#5c6166' },
    ],
});

export default ThemeLightBase16;
