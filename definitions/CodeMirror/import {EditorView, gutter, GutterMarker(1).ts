import {EditorView, gutter, GutterMarker} from "@codemirror/view"
import {StateField, StateEffect, RangeSet} from "@codemirror/state"

//ref: https://jasonlaster.github.io/devtools/js/2017/02/21/react+codemirror.html

const breakpointMarker = new class extends GutterMarker {
    toDOM() { return document.createTextNode("●") }
}
  
const breakpointEffect = StateEffect.define<{pos: number, on: boolean}>({
    map: (val, mapping) => ({pos: mapping.mapPos(val.pos), on: val.on})
})

const breakpointTransparentMarker = new class extends GutterMarker {
  toDOM() { 
    let marker = document.createElement("span") 
    marker.textContent = "●"
    marker.className = "cm-breakpoint-guttertext-transparent"

    return marker
  }
}

const breakpointEffectTransparent = StateEffect.define<{pos: number, hovered: boolean}>({
  map: (val, mapping) => ({pos: mapping.mapPos(val.pos), hovered: val.hovered})
})
  
const breakpointState = StateField.define<RangeSet<GutterMarker>>({
    create() { return RangeSet.empty },
    update(set, transaction) {
      set = set.map(transaction.changes)
      for (let e of transaction.effects) {
        if (e.is(breakpointEffect)) {       
          console.log("on====>", e.value);

          if (e.value.on)
          {
            set = set.update({filter: _ => false})
            set = set.update({add: [breakpointMarker.range(e.value.pos)]})
          }
          else
            set = set.update({filter: from => from != e.value.pos})
        }
        else if (e.is(breakpointEffectTransparent)) {
          console.log("Hover====>", e.value);
          
          if (e.value.hovered)
          {
            set = set.update({filter: _ => false})
            set = set.update({add: [breakpointTransparentMarker.range(e.value.pos)]})
          }
          else
            set = set.update({filter: _ => false})
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

function displayTransparentBreakPoint(view: EditorView, pos: number, diplayMarker: boolean) {
    let breakpoints = view.state.field(breakpointState)
    let hasBreakpoint = false

    breakpoints.between(pos, pos, () => {hasBreakpoint = true})

    view.dispatch({
      effects: breakpointEffectTransparent.of({pos, hovered: diplayMarker && (hasBreakpoint == false)})
    })
}

const breakpointGutter = [
    breakpointState,
    gutter({
      class: "cm-breakpoint-gutter",
      markers: v => v.state.field(breakpointState),
      initialSpacer: () => breakpointMarker,
      domEventHandlers: {
        mousedown(view, line, e) {
          e.preventDefault();
          
          toggleBreakpoint(view, line.from)
          return false
        },
        mouseenter(view, line, e) {
          e.preventDefault();

          //displayTransparentBreakPoint(view, line.from, true)
          return true     
        },
        mousemove(view, line, e) {
          e.preventDefault();

          displayTransparentBreakPoint(view, line.from, true)
          return true     
        },
        mouseleave(view, line, e) {
          e.preventDefault();

          displayTransparentBreakPoint(view, line.from, false)
          return true     
        },
      }
    }),
    EditorView.baseTheme({
      ".cm-breakpoint-gutter .cm-gutterElement": {
        color: "#822",
        paddingRight: "4px",
        cursor: "pointer"
      },
      ".cm-breakpoint-gutter": {
        cursor: "pointer"
      }
    })
];

export { breakpointGutter, breakpointState };
