import {EditorView, gutter, GutterMarker} from "@codemirror/view"
import {StateField, StateEffect, RangeSet} from "@codemirror/state"

// This file is a bit of a draft, it should be reviewed and refractored
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

    // We should add a property so that the breakpoint moves when 
    update(state, transaction) {
      state.set = state.set.map(transaction.changes)
      transaction.changes.iterChanges((fromA, toA, fromB, toB)=>{    
        // fromA/toA: the change in the starting document
        // fromB/toB: the replacement in the changed document.

        let posToAdd = new Set<number>(),
            posToDel = new Set<number>(),
            diffTo = toB - toA

        state.breakpointsPos.forEach((pos) => {
          //Here we consider that fromB is always equal to fromA
          console.log("==>", fromA, toA);
          console.log("==>", fromB, toB);
          console.log(state.breakpointsPos);
          
          // If the breakpoint was inside a removed block, we delete it
          if (pos > fromA && pos <= toA ){
            //console.log("del:",pos);
            
            posToDel.add(pos)
          }
          else if (pos > toA) {
            //console.log("add:",pos);

            posToDel.add(pos)
            posToAdd.add(pos+diffTo)
          }
        })
        console.log("toAdd : ", posToAdd);
        console.log("toDel : ", posToDel);
        
        // We have to delete before adding
        posToDel.forEach((pos) => {
          state.breakpointsPos.delete(pos)
        })

        posToAdd.forEach((pos) => {
          state.breakpointsPos.add(pos)
        })

        console.log("Final : ", state.breakpointsPos);

        state.temporaryGuttersPos = null
      }, true);
      

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
