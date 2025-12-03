/* File: Backpack.ts
 * Author: Connor Larmer 
 *
 * Summary: Inventory trigger icon for Level 2, hangs out in the top left
 * corner and provides a way for the user to access the inventory
 *
 */

import Konva from "konva";
import type { Element } from "./Element";

export class Backpack implements Element {

    private backpackSprite: Konva.Image;
    private id: string;

    getURL()            { return "/res/backpack.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 50; }
    getDefaultHeight()  { return 50; }
    getElement()        { return this.backpackSprite; }
    
    constructor (id: string) {
        this.id = id;
        this.backpackSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.backpackSprite.image(img.image());
            this.backpackSprite.id(id);
            this.backpackSprite.x(5);
            this.backpackSprite.y(5);
            this.backpackSprite.width(this.getDefaultWidth());
            this.backpackSprite.height(this.getDefaultHeight());
        });

        /* Default mouse interaction */
        this.backpackSprite.on("mouseover", () => {
			this.backpackSprite.getStage().container().style.cursor = "pointer";
        });
        this.backpackSprite.on("mouseout", () => {
        	this.backpackSprite.getStage().container().style.cursor = "default";
        });

    }

}
