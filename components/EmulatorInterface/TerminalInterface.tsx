import React, { useState } from "react"
import { Stage, Layer, Text, Rect, Circle, Line } from 'react-konva';

import { TerminalCharacter, TERMINAL_COLORS } from "definitions/Terminal";


const BackgroundLayer = (props: {width: number, height:number}) => {
    return (
        <Layer>
            <Rect 
                x={0} y={0}                 
                width={props.width} 
                height={props.height}
                fill='#111014'
            />
        </Layer>
    )
}

interface TerminalInterfaceProps {

}

export default function TerminalInterface(props: TerminalInterfaceProps) {

    const fontRatio = 0.5;
    const nbCharInLine = 48; //80 standart
    const terminalWidth = 480;
    const offset = 0xB8000;

    const nbCharInPage = 1000;
    //const [fontSize, setFontSize] = useState<number>(20);

    const [buffer, setBuffer] = useState<number[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [cursor, setCursor] = useState<{x: number, y:number}>({
        x: 0, 
        y: 0
    });

    const fontSize = terminalWidth / nbCharInLine / fontRatio;

    const getCharacter = (index: number): TerminalCharacter => {
        const H_B = buffer[offset + index + 1] << 8;

        return {
            ascii: buffer[offset + index],
            color: H_B & 0x0F,
            background: H_B >> 4
        }
    }

    const shouldAddLine = (char:TerminalCharacter, previousChar: TerminalCharacter, lineArray): boolean => {
        //Separate the conditions to make it clearer

        if (previousChar == null) 
            return true;

        if (previousChar.color != char.color && previousChar.background != char.background)
            return true;

        if (char.ascii = 0x0A) {
            return
        }
    }

    const generateTextFromBuffer = () => {

        let lineArray:Array<React.ReactElement> = [],

            currentLineIdx:number = 0,
            isNewLine: boolean = false;

        let previousChar: TerminalCharacter = null;

        for (let i = 0; i < nbCharInPage; i++) {

            const char:TerminalCharacter = getCharacter(i);

            if ( shouldAddLine(char, previousChar, lineArray) ) 
            {
                const color = TERMINAL_COLORS[char.color],
                      content = String.fromCharCode(char.ascii),
                      y = currentLineIdx * fontSize;

                const newLine:React.ReactElement = (
                        <Text 
                            text={content}
                            fill={color}
                            y={y}
                        />
                    );

                lineArray.push(newLine);
            }
            
            if( lineArray.length == 0 || char){

            }
        }
    }
    
    return (
        <div>
            <span style={{fontFamily:"Inconsolata"}}>Terminale</span>
            <Stage 
                width={terminalWidth} 
                height={window.innerHeight}
            >
                <BackgroundLayer width={terminalWidth} height={175} />

                <Layer
                >
                    <Text text="Some text on canvas" y={0} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>
                    <Text text="Some text on canvas" y={25} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>
                    <Text text="AAAAAAAAAAAAAAAAAAAAAAAAAAABBBBAAAAAAAAAAAAAAAAAAAAABBB" y={50} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>
                    <Text text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" y={75} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>
                    <Text text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" y={100} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>
                    <Text text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" y={125} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>
                    <Text text="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" y={150} fontSize={fontSize} fill='red' fontFamily="Inconsolata"/>

                </Layer>
            </Stage>
        </div>
    )
}
