/* File: Gem.ts
 * Author: Connor Larmer 
 *
 * Draggable Gem for level 2
 *
 */

import Konva from "konva";
import type { Element } from "./Element";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";

export class Gem implements Element {

    private gemSprite: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/res/crystal.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 72; }
    getDefaultHeight()  { return 96; }
    getElement()        { return this.gemSprite; }
    
    constructor (x : number, y : number, id: string) {
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.gemSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.gemSprite.image(img.image());
            this.gemSprite.id(id);
            this.gemSprite.x(this.xPos);
            this.gemSprite.y(this.yPos);
            this.gemSprite.width(this.getDefaultWidth());
            this.gemSprite.height(this.getDefaultHeight());
            this.gemSprite.offsetX(this.getDefaultWidth()/2);
            this.gemSprite.offsetY(this.getDefaultHeight()/2);
            this.gemSprite.draggable(false);
            this.gemSprite.visible(false);
        });

        this.gemSprite.on("mouseover", () => {
			this.gemSprite.getStage().container().style.cursor = "grab";
        });
        this.gemSprite.on("mouseout", () => {
        	this.gemSprite.getStage().container().style.cursor = "default";
        });
        this.gemSprite.on("dragstart", () => {
        	this.gemSprite.getStage().container().style.cursor = "grabbing";            
        });
        this.gemSprite.on("dragend", () => {
        	this.gemSprite.getStage().container().style.cursor = "grab";            
        });
    }

    enable() {
        this.gemSprite.draggable(true);
        this.gemSprite.visible(true);        
    }

    disable() {
        this.gemSprite.draggable(false);
        this.gemSprite.visible(false);        
    }

    getInventoryItem() {
        return {
            name: "level2Clue",
            image: "crystal.png",
            width: 300,
            height: 350,
            text1: "TAN()",
            text1X: STAGE_WIDTH / 2 - 20,
            text1Y: STAGE_HEIGHT / 2 - 10,
        };
    }
}
