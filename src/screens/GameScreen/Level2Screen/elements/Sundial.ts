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
        this.sundialSprite = new Konva.Image({image: undefined});
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

        /* Default mouse interaction */
        this.sundialSprite.on("mouseover", () => {
			this.sundialSprite.getStage().container().style.cursor = "pointer";
        });
        this.sundialSprite.on("mouseout", () => {
        	this.sundialSprite.getStage().container().style.cursor = "default";
        });
    }

}
