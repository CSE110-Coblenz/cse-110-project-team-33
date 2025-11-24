/* File: InfoTray.ts
 * Author: Connor Larmer 
 * Created on 2025-11-23 @ 6:23 PM
 *
 */

import Konva from "konva";
import type Element from "Element" 


export class InfoTray implements Element {
    private group: Konva.Group;
    private bg: Konva.Image;

    private isOpen: boolean;
    private isAnim: boolean;

    closedOffset()  { return 96- 16; }
    openOffset()    { return 0; }
    animStep()      { return 10; }

    getElement()        { return this.group;}
    getURL()            { return "img/level2/measure.png"; }
    getID()             { return this.id; }
    getDefaultWidth()   { return 96; }
    getDefaultHeight()  { return 96; }


    constructor(x: number, y: number, id: string) {
        this.isAnim = false;
        this.isOpen = false;
        this.group = new Konva.Group({
            x: x, y: y,
            offsetX: 96/2,
            offsetY: this.closedOffset(),
            scaleX: 4,
            scaleY: 4,
            id: id
        });
        this.bg = new Konva.Image({image: undefined});

        Konva.Image.fromURL(this.getURL(), (img) => {
            this.bg.image(img.image());
            this.bg.x(0);
            this.bg.y(0);
            this.bg.width(this.getDefaultWidth());
            this.bg.height(this.getDefaultHeight());
        });


        /* Open/Close tray */
        this.group.on("click", () => {
            this.toggleTray();
        });

/*
        this.digit = new Konva.Text({
            text: this.value,
            align: "center",
            fontSize: 10,
            fontFamily: "Press Start 2P",
            fill: "#fae800",
            x: 8,
            y: 16,
            height: 10,
            width: 10,
            offsetX: 5,
            offsetY: 5            
        });
*/

        this.group.add(this.bg);
    }


    toggleTray() {
        if(this.isAnim) {
            return;
        }

        let target = this.openOffset();
        let step = -1 * this.animStep();
        if(this.isOpen) {
            target = this.closedOffset();
            step = this.animStep();
        }



        this.isAnim = true;
        let animTimer: any = null;
        let animFunc = () => {
            if(this.group.offsetY() == target) {
                this.isAnim = false;
                this.isOpen = !(this.isOpen);
                clearInterval(animTimer);
                return;
            }
            this.group.offsetY(this.group.offsetY() + step);
        };
        animTimer = setInterval(animFunc, 32);
    }
}
