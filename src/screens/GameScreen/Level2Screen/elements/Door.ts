/* File: Door.ts
 * Author: Connor Larmer 
 * Created on 2025-11-05 @ 5:13 PM
 *
 * Summary: Door element, holds spritesheet to animate door opening/closing
 * based on the state of the level.
 *
 * NOTE: Sprite animation ref: <https://konvajs.org/docs/shapes/Sprite.html>
 */

import Konva from "konva";
import type { Element } from "./Element.ts";

export class Door implements Element {

    private doorSprite: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    private doorState: boolean;

    getURL()            { return "/res/level2/debug_door_spritesheet.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 256; }
    getDefaultHeight()  { return 184; }
    getElement()        { return this.doorSprite; }

    
    
    constructor (x : number, y : number, id: string) {
        this.xPos = x;
        this.yPos = y;
        this.id = id;
		this.doorState = false;
        this.doorSprite = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.doorSprite.x(this.xPos);
            this.doorSprite.y(this.yPos);
            this.doorSprite.id(this.id);
            this.doorSprite.image(img.image());
            this.doorSprite.width(this.getDefaultWidth());
            this.doorSprite.height(this.getDefaultHeight());
            this.doorSprite.offsetX(this.getDefaultWidth()/2);
            this.doorSprite.crop({
                x:0,
                y:0,
                width:64,
                height:46
            });
        });
    }

    setAnimFrame(frame: number): void {
            this.doorSprite.cropX(frame*64);
    }

    /* Gross little method to animate the door opening */
    animDoorOpen(): void {
    	if(this.doorState == true) return;
        let frameCount = 0;
        let animTimer: any = null;
        let animFunc = () => {
            this.setAnimFrame(frameCount);
            if(frameCount == 3) {
                clearInterval(animTimer);
            }
            frameCount += 1;            
        };
        animTimer = setInterval(animFunc, 100);
        this.doorState = true;
    }

    /* Gross little method to animate the door closing */
    animDoorClose(): void {
    	if(this.doorState == false) return;
        let frameCount = 3;
        let animTimer: any = null;
        let animFunc = () => {
            this.setAnimFrame(frameCount);
            if(frameCount == 0) {
                clearInterval(animTimer);
            }
            frameCount -= 1;            
        };
        animTimer = setInterval(animFunc, 100);
        this.doorState = false;
    }

}
