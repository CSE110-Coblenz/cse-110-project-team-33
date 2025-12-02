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
import type { Element } from "./Element";

export class PuzzleDial implements Element {

    private group: Konva.Group;
    private sundialSprite: Konva.Image;
    private gnomonSprite: Konva.Image;
    private gnomonShadow: Konva.Image;
    private xPos : number;
    private yPos : number;
    private id: string;

    private shadowHeight: number;
    private shadowAnimActive: boolean;
    private dialOffset: number;

    getURL()            { return "/res/level2/sundial_large.png"; }
    getGnomonURL()            { return "/res/level2/gnomon.png"; }
    getShadowURL()            { return "/res/level2/gnomon_shadow.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 512; }
    getDefaultHeight()  { return 512*2; }
    getElement()        { return this.group; }

    getMinShadowHeight()    { return 0; }
    getMaxShadowHeight()    { return 112; }

    getMinSundialHeight()   {return -40; }
    getMaxSundialHeight()   {return 20; }
    
    constructor (x : number, y : number, id: string, startingHeight: number) {
        this.shadowAnimActive = false;
        this.shadowHeight = startingHeight;
        this.dialOffset = -66;
        this.xPos = x;
        this.yPos = y;
        this.id = id;
        this.group = new Konva.Group({
            x: this.xPos,
            y: this.yPos,
            offsetY: this.dialOffset
        });
        this.sundialSprite = new Konva.Image({image: undefined});
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
        this.gnomonSprite = new Konva.Image({image: undefined});
        this.gnomonShadow = new Konva.Image({image: undefined});
        Konva.Image.fromURL(this.getShadowURL(), (img) => {
            this.gnomonShadow.image(img.image());
            this.gnomonShadow.x(0);
            this.gnomonShadow.y(0);
            this.gnomonShadow.id(this.id + "_shadow");
            this.gnomonShadow.width(gnomonWidth);
            this.gnomonShadow.height(this.shadowHeight);
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

        /*
        (pixels)
        Shadow pixel max dimensions: 320 x 112
        Shadow pixel min dimensions: 320 x 0

        (inches)
        Scaled min dim: 12 x 0
        Scaled max dim: 12 x 4.2
        */
        this.setShadowHeight(this.shadowHeight);
        this.group.add(this.sundialSprite);
        this.group.add(this.gnomonShadow);
        this.group.add(this.gnomonSprite);
    }

    setShadowHeight(height: number) {
        // Disallow new height change until previous is done
        if(this.shadowAnimActive) {
            return;
        }

        // Calibrated to min: 0, max: 4.2 (inches)
        let shadowPxHeight = Math.trunc(height * 26.67);
        // Calibrated to min: -100, max: 20 (Y offset)
        let dialPxOffset = Math.trunc(height*14) - 40;
        // Check bounds + snap to max/min
        if( shadowPxHeight > this.getMaxShadowHeight() ) {
            shadowPxHeight = this.getMaxShadowHeight();
        } else if(shadowPxHeight < this.getMinShadowHeight()) {
            shadowPxHeight = this.getMinShadowHeight();
        }
        if( dialPxOffset > this.getMaxSundialHeight()) {
            dialPxOffset = this.getMaxSundialHeight();
        } else if( dialPxOffset < this.getMinSundialHeight()) {
            dialPxOffset = this.getMinSundialHeight();
        }


        let dialDelta = Math.trunc(dialPxOffset - this.dialOffset);
        let shadowDelta = Math.trunc(shadowPxHeight - this.shadowHeight);

        let dialStep = 0;
        let shadowStep = 0;

        if(dialPxOffset > this.dialOffset) {
            dialStep = dialDelta/shadowDelta;
        } else if (dialPxOffset < this.dialOffset) {
            dialStep = -1 * (dialDelta/shadowDelta);
        }        
        if(shadowPxHeight > this.shadowHeight) {
            shadowStep = 1;
        } else if (shadowPxHeight < this.shadowHeight) {
            shadowStep = -1;
        }

        // Animate
        this.shadowAnimActive = true;
        let animTimer: any = null;
        let animFunc = () => {
            if(shadowPxHeight == this.shadowHeight) {
                clearInterval(animTimer);
                this.shadowAnimActive = false;
                return;
            }
            this.shadowHeight += shadowStep;                
            this.dialOffset += dialStep;
            this.group.offsetY(this.dialOffset);
            this.gnomonShadow.height(this.shadowHeight);
        };
        animTimer = setInterval(animFunc, 32);
    }
}
