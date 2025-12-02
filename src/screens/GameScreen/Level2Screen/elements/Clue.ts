/* File: Clue.ts
 * Author: Connor Larmer 
 *
 * Draggable clue for level 2
 *
 */

import Konva from "konva";
import type { Element } from "./Element";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";

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
            this.clueSprite.draggable(true);
        });

        this.clueSprite.on("mouseover", () => {
			this.clueSprite.getStage().container().style.cursor = "grab";
        });
        this.clueSprite.on("mouseout", () => {
        	this.clueSprite.getStage().container().style.cursor = "default";
        });
        this.clueSprite.on("dragstart", () => {
        	this.clueSprite.getStage().container().style.cursor = "grabbing";            
        });
        this.clueSprite.on("dragend", () => {
        	this.clueSprite.getStage().container().style.cursor = "grab";            
        });
    }

    getInventoryItem(deg1: number, deg2: number, deg3: number) {

        let degStr = "";
        degStr += String(deg1.toFixed(2) + "º,  ");
        degStr += String(deg2.toFixed(2) + "º,  ");
        degStr += String(deg3.toFixed(2) + "º   ");
        return {
            name: "level2Clue",
            image: "inventory_paper.png",
            width: 500,
            height: 300,
            text1: "Puzzle 2: Sin, Cos, or Tan...",
            text1X: STAGE_WIDTH / 2 - 80,
            text1Y: STAGE_HEIGHT / 2 - 80,
            text2: degStr,
            text2X: STAGE_WIDTH / 2,
            text2Y: STAGE_HEIGHT / 2 - 20,
            text3: "With shadow's height make angles right!",
            text3X: STAGE_WIDTH / 2 - 130,
            text3Y: STAGE_HEIGHT / 2 + 40
        };
    }
}
