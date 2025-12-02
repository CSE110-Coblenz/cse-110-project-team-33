/* File: ReturnArrow.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 3:51 PM
 *
 * Summary: Return arrow, a standard element that the user can click on to
 * return to the previous subview within a level. This reduces repeated code
 * across views, and also defines a way of switching subviews efficiently.
 *
 */

import Konva from "konva";
import type { Element } from "./Element";

export class ReturnArrow implements Element {

    private arrowSprite: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/res/level2/back_arrow.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 64; }
    getDefaultHeight()  { return 64; }
    getElement()        { return this.arrowSprite; }

    /* clickCB is some callback which is run whenever the button is clicked */
    constructor (x : number, y : number, clickCB: () => void,  id: string) {
        /* coordinates represnt top left of element */
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.arrowSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.arrowSprite.image(img.image());
            this.arrowSprite.id(id);
            this.arrowSprite.x(this.xPos);
            this.arrowSprite.y(this.yPos);
            this.arrowSprite.width(this.getDefaultWidth());
            this.arrowSprite.height(this.getDefaultHeight());
            this.arrowSprite.listening(true);
            this.arrowSprite.on("click", clickCB);
        });
    }

}
