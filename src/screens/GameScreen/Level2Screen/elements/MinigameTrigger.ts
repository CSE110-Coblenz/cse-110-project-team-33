/* File: MinigameTrigger.ts
 * Author: Connor Larmer 
 * Created on 2025-12-03 @ 10:08 PM
 *
 * Summary: Clicking on this should trigger the minigame, then switch back to
 * the current level.
 *
 */

import Konva from "konva";
import type { Element } from "./Element";

export class MinigameTrigger implements Element {

    private chestSprite: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/res/chestSpritesheet.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 100; }
    getDefaultHeight()  { return 75; }
    getElement()        { return this.chestSprite; }
    
    constructor (x : number, y : number, id: string) {
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.chestSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.chestSprite.image(img.image());
            this.chestSprite.id(id);
            this.chestSprite.x(this.xPos);
            this.chestSprite.y(this.yPos);
            this.chestSprite.width(this.getDefaultWidth());
            this.chestSprite.height(this.getDefaultHeight());
            this.chestSprite.offsetX(this.getDefaultWidth()/2);
            this.chestSprite.offsetY(this.getDefaultHeight()/2);
            this.chestSprite.crop({
                x: 0, y: 0,
                width: 400,
                height: 300
            })
        });

        /* Default mouse interaction */
        this.chestSprite.on("mouseover", () => {
			this.chestSprite.getStage().container().style.cursor = "pointer";
			this.chestSprite.cropY(300);
        });
        this.chestSprite.on("mouseout", () => {
        	this.chestSprite.getStage().container().style.cursor = "default";
			this.chestSprite.cropY(0);
        });
    }
}
