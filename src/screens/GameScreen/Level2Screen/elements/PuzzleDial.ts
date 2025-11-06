/* File: PuzzleDial.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 11:11 PM
 *
 * Summary: Puzzle sundial element, used in SundialView. Contains code for
 * rendering sundial sprite to the screen, and drawing 'accurate' shadows as
 * part of the puzzle.
 *
 */

import Konva from "konva";
import type { Element } from "./Element.ts";

export class Sundial implements Element {

    private sundialSprite: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/img/level2/sundial_small2.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 96; }
    getDefaultHeight()  { return 96*2; }
    getElement()        { return this.sundialSprite; }
    
    constructor (x : number, y : number, id: string) {
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.sundialSprite = new Konva.Image();
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.sundialSprite.image(img.image());
            this.sundialSprite.id(id);
            this.sundialSprite.x(this.xPos);
            this.sundialSprite.y(this.yPos);
            this.sundialSprite.width(this.getDefaultWidth());
            this.sundialSprite.height(this.getDefaultHeight());
            this.sundialSprite.offsetX(this.getDefaultWidth()/2);
            this.sundialSprite.offsetY(this.getDefaultHeight()/2);
        });
    }

}
