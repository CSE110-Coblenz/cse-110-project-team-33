/* File: Sundial.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 2:05 PM
 *
 * Summary: Sundial element, to make drawing multiple sundials easier with
 * less repeated code. Also allows for each sundial to return a unique view
 * when clicked on, acting as an interactive element on the screen that triggers
 * a new subview.
 */

import Konva from "konva";
import type { Element } from "./Element";

export class Clue implements Element {

    private clueSprite: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/res/Clue.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 96; }
    getDefaultHeight()  { return 96; }
    getElement()        { return this.clueSprite; }
    
    constructor (x : number, y : number, id: string) {
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.clueSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.clueSprite.image(img.image());
            this.clueSprite.id(id);
            this.clueSprite.x(this.xPos);
            this.clueSprite.y(this.yPos);
            this.clueSprite.width(this.getDefaultWidth());
            this.clueSprite.height(this.getDefaultHeight());
            this.clueSprite.offsetX(this.getDefaultWidth()/2);
            this.clueSprite.offsetY(this.getDefaultHeight()/2);
        });

    }

}
