import {EditorView, gutter, GutterMarker} from "@codemirror/view"
import {StateField, StateEffect, RangeSet} from "@codemirror/state"

//ref: https://jasonlaster.github.io/devtools/js/2017/02/21/react+codemirror.html

interface GutterState {
  set: RangeSet<GutterMarker>,
  temporaryGuttersPos: number,
  breakpointsPos: Set<number>,
}

const breakpointMarker = new class extends GutterMarker {
  toDOM() { 
    let marker = document.createElement("span") 
    marker.textContent = "●"
    marker.className = "cm-breakpoint-guttertext-permanent"

    return marker
  }
}

const breakpointTransparentMarker = new class extends GutterMarker {
  toDOM() { 
    let marker = document.createElement("span") 
    marker.textContent = "●"
    marker.className = "cm-breakpoint-guttertext-transparent"

    return marker
  }
}

const breakpointEffect = StateEffect.define<{pos: number, on: boolean, temporary: boolean}>({
    map: (val, mapping) => ({pos: mapping.mapPos(val.pos), on: val.on, temporary: val.temporary})
})
  
const breakpointState = StateField.define<GutterState>({
    create() { 
      return {
        set:RangeSet.empty, 
        temporaryGuttersPos: null, 
        breakpointsPos: new Set<number>()
      } 
    },
    update(state, transaction) {
      state.set = state.set.map(transaction.changes)
      transaction.changes.iterChanges((fromA, toA, fromB, toB)=>{
        let posToAdd = new Set<number>(),
            diffTo = toB - toA
        
        state.breakpointsPos.forEach((pos) => {
          //Here we concider that fromB is always equal to fromA
          //if (pos >= fromA) 
          //{
            state.breakpointsPos.delete(pos)

            if (diffTo > 0) 
            {
              if (toB >= pos) 
              {
                posToAdd.add(pos+diffTo)
              }
              else if (toB < pos) 
              {
                //We dont have to change its value
                posToAdd.add(pos)
              }
            }
            else if (diffTo < 0) 
            {
              if (toB >= pos) 
              {
                posToAdd.add(pos+diffTo)
              }
              else if (toB < pos) 
              {
                posToAdd.add(toB-1)
              }
            }
          //}
        })
        console.log(posToAdd);
        
        posToAdd.forEach((pos) => {
          state.breakpointsPos.add(pos)
        })

        state.temporaryGuttersPos = null
      });
      

      for (let e of transaction.effects) {
        if (e.is(breakpointEffect)) { 
          state.set.between(0, state.set.size, (v)=>{console.log(v)});

          if (e.value.on) {            
            state.breakpointsPos.add(e.value.pos)
            state.set = state.set.update({filter: from => from != e.value.pos})
            state.set = state.set.update({add: [breakpointMarker.range(e.value.pos)]})
          }
          else {
            state.breakpointsPos.delete(e.value.pos)
            state.set = state.set.update({filter: from => from != e.value.pos})
          }

          if (e.value.temporary && !state.breakpointsPos.has(e.value.pos))
          {            
            state.set = state.set.update({add: [breakpointMarker.range(e.value.pos)]})
            state.temporaryGuttersPos = e.value.pos
          }
          else
          {
            state.temporaryGuttersPos = null
          }
          
          state.set = state.set.update({filter: (fpos) => {          
            
            return ((fpos == state.temporaryGuttersPos) || state.breakpointsPos.has(fpos))
          }});

        }  
      }
      return state
    }
})

function toggleBreakpoint(view: EditorView, pos: number, setGutter: boolean, diplayTransparentMarker: boolean) {
    let breakpoints = view.state.field(breakpointState)
    let hasBreakpoint = breakpoints.breakpointsPos.has(pos)
    
    //If the user clicked on the gutter (aka: setGutter==true)
    let on = (setGutter && !hasBreakpoint) || (!setGutter && hasBreakpoint)

    view.dispatch({
      effects: breakpointEffect.of({pos, on: on, temporary:diplayTransparentMarker})
    })
}

const breakpointGutter = [
    breakpointState,
    gutter({
      class: "cm-breakpoint-gutter",
      markers: v => v.state.field(breakpointState).set,
      initialSpacer: () => breakpointMarker,
      domEventHandlers: {
        mousedown(view, line, e) {
          e.preventDefault();
          
          toggleBreakpoint(view, line.from, true, false)
          return false
        },
        mouseenter(view, line, e) {
          e.preventDefault();

          toggleBreakpoint(view, line.from, false, true)
          //displayTransparentBreakPoint(view, line.from, true)
          return true     
        },
        mousemove(view, line, e) {
          e.preventDefault();

          toggleBreakpoint(view, line.from, false, true)
          return true     
        },
        mouseleave(view, line, e) {
          e.preventDefault();

          toggleBreakpoint(view, line.from, false, false)
          return true     
        },
        keydown(view, line) {          
          return true
        }
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
