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
    private labelA: Konva.Text;
    private labelB: Konva.Text;
    private labelC: Konva.Text;
    private labelT: Konva.Text;

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

        this.labelA = new Konva.Text({
            text: "A:  4.20 in",
            align: "left",
            fontSize: 6,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 8,
            y: 36,
            height: 10,
            width: 80,
        });

        this.labelB = new Konva.Text({
            text: "B: 12.00 in",
            align: "left",
            fontSize: 6,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 8,
            y: 36+12,
            height: 10,
            width: 80,
        });
        this.labelC = new Konva.Text({
            text: "C: 12.71 in",
            align: "left",
            fontSize: 6,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 8,
            y: 36 + 12*2,
            height: 10,
            width: 80,
        });

        this.labelT = new Konva.Text({
            text: "T: 19.3 deg",
            align: "left",
            fontSize: 6,
            fontFamily: "Press Start 2P",
            fill: "black",
            x: 8,
            y: 36 + 12*3,
            height: 10,
            width: 80,
        });

        this.group.add(this.bg);
        this.group.add(this.labelA);
        this.group.add(this.labelB);
        this.group.add(this.labelC);
        this.group.add(this.labelT);
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
