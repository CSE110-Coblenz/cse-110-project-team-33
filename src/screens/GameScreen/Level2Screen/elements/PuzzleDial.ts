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
    private gnomonSprite: Konva.Image;
    private gnomonShadow: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    getURL()            { return "/img/level2/sundial_large.png"; }
    getGnomonURL()            { return "/img/level2/gnomon.png"; }
    getShadowURL()            { return "/img/level2/gnomon_shadow.png"; }
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
        const gnomonWidth = this.getDefaultWidth() * (80/128);
        const gnomonHeight = this.getDefaultHeight() * (30/256);
        let shadowHeight = 64;
        this.gnomonSprite = new Konva.Image();
        this.gnomonShadow = new Konva.Image();
        Konva.Image.fromURL(this.getShadowURL(), (img) => {
            this.gnomonShadow.image(img.image());
            this.gnomonShadow.x(0);
            this.gnomonShadow.y(0);
            this.gnomonShadow.id(this.id + "_shadow");
            this.gnomonShadow.width(gnomonWidth);
            this.gnomonShadow.height(shadowHeight);
            this.gnomonShadow.offsetX(gnomonWidth/2);
            this.gnomonShadow.offsetY(this.getDefaultHeight() * (-30/256));
            this.gnomonShadow.opacity(0.5);
        });
        Konva.Image.fromURL(this.getGnomonURL(), (img) => {
            this.gnomonSprite.image(img.image());
            this.gnomonSprite.x(0);
            this.gnomonSprite.y(0);
            this.gnomonSprite.id(this.id + "_gnomon");
            this.gnomonSprite.width(gnomonWidth);
            this.gnomonSprite.height(gnomonHeight);
            this.gnomonSprite.offsetX(gnomonWidth/2);
            //this.gnomonSprite.offsetY(this.getDefaultHeight() * (-29/256));
        });

        this.group.listening(true);
        this.gnomonShadow.on("click", () => {
            shadowHeight += 4;
            this.gnomonShadow.height(shadowHeight);
        });
/*        this.shadow = new Konva.Image({
            
            x: 0,
            y: 0,
            offsetX: shadowWidth/2,
            offsetY: -this.getDefaultHeight() * (29/256),
            fill: "red",
        });
*/


        this.group.add(this.sundialSprite);
        this.group.add(this.gnomonShadow);
        this.group.add(this.gnomonSprite);
    }

}
