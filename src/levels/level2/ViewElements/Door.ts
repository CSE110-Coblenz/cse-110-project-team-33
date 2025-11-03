/* FILE:        Door.ts
 * AUTHOR:      Connor Larmer
 * CREATED ON:  Nov 2 2025, 1:50 PM
 *
 * SUMMARY: This is a wrapper for the door element, really only contains
 *          information relating to the doors visual state, controlled by
 *          the level controller.
 *
 */

import Konva from "konva";


export class Door {

    static get defaultDoorWidth()   { return 256; }
    static get defaultDoorHeight()  { return 112; }

    private isOpen: boolean;
    private xPos: number;    
    private yPos: number;    

    private doorSprite: Konva.Rect;
    private group: Konva.Group;
    
    constructor(xPos: number, yPos: number) {
        this.xPos = xPos;
        this.yPos = yPos;

        this.group = new Konva.Group({visible: false});
        this.group.x(xPos);
        this.group.y(yPos);
        
        // Align horizontal center of door to xPos
        // Align top of door to yPos
        this.doorSprite = new Konva.Rect({
            x: 0, y: 0,
            width: Door.defaultDoorWidth,
            height: Door.defaultDoorHeight,
            fill: "red",
            offsetX: Door.defaultDoorWidth/2
        });
        
        this.setOpen(false);
        this.group.add(this.doorSprite);
        this.group.visible(true);
    }

    getOpen(): boolean {
        return this.isOpen;
    }

    setOpen(state: boolean) {
        this.isOpen = state;
        if(this.isOpen)
        {
            this.doorSprite.fill("green")
        }
        else
        {
            this.doorSprite.fill("red");
        }
    }

    getGroup(): Konva.Group {
        return this.group;
    }
}
