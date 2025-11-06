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

export class PuzzleDial implements Element {

    private group: Konva.Group;
    private sundialSprite: Konva.Image;
    private shadow: Konva.Shape;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/img/level2/sundial_large.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 512; }
    getDefaultHeight()  { return 512*2; }
    getElement()        { return this.group; }
    
    constructor (x : number, y : number, id: string) {
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.group = new Konva.Group({
            x: this.xPos,
            y: this.yPos
        });
        this.sundialSprite = new Konva.Image();
        Konva.Image.fromURL(this.getURL(), (img) => {
            this.sundialSprite.image(img.image());
            this.sundialSprite.id(id);
            this.sundialSprite.x(0);
            this.sundialSprite.y(0);
            this.sundialSprite.width(this.getDefaultWidth());
            this.sundialSprite.height(this.getDefaultHeight());
            this.sundialSprite.offsetX(this.getDefaultWidth()/2);
        });

        /* Gross calculation to determine shadow width based on pixel ratios */
        const shadowWidth = this.getDefaultWidth() * (80/128);
        this.shadow = new Konva.Shape({
            sceneFunc: (context, shape) => {
                context.beginPath();
                context.moveTo(0,0);
                context.lineTo(0,64);
                context.lineTo(shadowWidth, 0);
                context.lineTo(0,0);
                context.closePath();
                context.fillStrokeShape(shape);
            },
            x: 0,
            y: 0,
            offsetX: shadowWidth/2,
            offsetY: -this.getDefaultHeight() * (29/256),
            fill: "red",
        });
        this.shadow.cache();
        this.shadow.filters([Konva.Filters.Invert]);
        this.shadow.pixelSize(10);

        this.group.add(this.sundialSprite);
        this.group.add(this.shadow);
    }

}
