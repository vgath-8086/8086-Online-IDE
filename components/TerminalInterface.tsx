import React, { useState } from "react"
import { Stage, Layer, Text } from 'react-konva';

import Konva from 'konva/lib/Core';
// Now you have a Konva object with Stage, Layer, FastLayer, Group, Shape and some additional utils function.
// Also core currently already have support for drag&drop and animations.
// BUT there are no shapes (rect, circle, etc), no filters.

// but you can simply add anything you need:
import { Rect } from 'konva/lib/shapes/Rect';
// importing a shape will automatically inject it into Konva object

var rect1 = new Rect();
// or:
//var shape = new Konva.Rect();

// for filters you can use this:
import { Blur } from 'konva/lib/filters/Blur';

interface TerminalInterfaceProps {

}

export default function TerminalInterface(props: TerminalInterfaceProps) {

    const [buffer, setBuffer] = useState<number[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [cursor, setCursor] = useState<{x: number, y:number}>({
        x: 0, 
        y: 0
    });

    return (
        <div>
            Terminale
            <Stage width={window.innerWidth} height={window.innerHeight}>

            </Stage>
        </div>
    )
}
