/* File: TextInput.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 11:47 PM
 *
 * Summary: Text input box.
 *
 */

import Konva from "konva";
import type { Element } from "./Element";
// import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";

export class TextInput implements Element {

    private group: Konva.Group;
    private box: Konva.Rect;
    private text: Konva.Text;
    private xPos : number;
    private yPos : number;
    private id: string;
    private contents: string;

    getURL()            { return "NOT IMPLEMENTED"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 64*3; }
    getDefaultHeight()  { return 64; }
    getElement()        { return this.group; }
    
    constructor (xPos: number, yPos: number, contents: string, id: string) {
        this.id = id;
        this.xPos = xPos;
        this.yPos = yPos;
        this.contents = contents;
        this.group = new Konva.Group({
            x: this.xPos,
            y: this.yPos,
            offsetX: this.getDefaultWidth()/2
        });
        
        this.box = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.getDefaultWidth(),
            height: this.getDefaultHeight(),
            fill: "yellow"
        });

        this.text = new Konva.Text({
            x: 0,
            y: 0,
            fontSize: 48,
            align: "center",
            verticalAlign: "middle",
            fontFamily: "Courier",
            width: this.getDefaultWidth(),
            height: this.getDefaultHeight(),
            text: this.contents
        });

        this.group.on("click", () => {
            const textarea = document.createElement("textarea");
//            document.getElementsByClassName("container").appendChild(textarea);

            textarea.value = "AAA";
            textarea.style.position = 'absolute';
            textarea.style.top = this.xPos + "px";
            textarea.style.left = this.yPos + "px";
            textarea.style.width = this.getDefaultWidth() + "px";
            textarea.style.height = this.getDefaultHeight() + "px";
            textarea.style.fontSize = this.text.fontSize() + 'px';
            textarea.style.color = "red";
            textarea.focus();
        });

        this.group.add(this.box);
        this.group.add(this.text);
        
    }

}
