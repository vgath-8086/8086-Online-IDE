
const TERMINAL_COLORS:string[] = ['black', 'blue', 'green', 'cyan','red', 'magenta', 'brown', '#AAA', 'gray', 'lightblue', 'lightgreen',
    'lightcyan', 'lightred', 'lightmagenta', 'yellow', 'white']


type TerminalCharacter = {
    ascii: number,
    color: number,
    background: number
}

export {TERMINAL_COLORS}
export type {TerminalCharacter}

