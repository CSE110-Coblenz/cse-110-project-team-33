/* FILE:        Sundial.ts
 * AUTHOR:      Connor Larmer
 * CREATED ON:  Nov 2 2025, 12:54 PM
 *
 *  SUMMARY:    Since there are multiple sundials consisting each of similar
 *              components and behaviors, this class exists to define a
 *              sundial as a component to make modification/organization easier
 */

import Konva from "konva";


export class Sundial {

    // Im lazy so we define some constants here, these are likely to change
    // later during development. Maybe they should be in relation to screen
    // size? 
    static get defaultDialRadius()   { return 48; }
    static get defaultBaseWidth()    { return Sundial.defaultDialRadius*2; }
    static get defaultBaseHeight()   { return Sundial.defaultDialRadius*2.25; }
    static get defaultHeightRange()  { return 24; }
    
    private xPos:   number;
    private yPos:   number;
    private height: number;

    private dialSprite : Konva.Ellipse;
    private baseSprite : Konva.Rect;

    // We use a group to contain the sundial bits
    private group: Konva.Group;

    constructor(xPos: number, yPos: number, height: number, uniqueID: string): Sundial {
        this.group = new Konva.Group({visible: false});
        this.group.id(uniqueID);
        
        // TODO: Replace these with actual sprites
        this.baseSprite = new Konva.Rect({
            x: 0, y : 0,
            width : Sundial.defaultBaseWidth,
            height : Sundial.defaultBaseHeight,
            fill: "#222222"
        });
        this.dialSprite = new Konva.Ellipse({
            x: Sundial.defaultDialRadius, y : 0,
            radiusX: Sundial.defaultDialRadius,
            radiusY: Sundial.defaultDialRadius/2,
            fill: "#555555"
        });

        this.setHeight(height);
        this.xPos = xPos;
        this.yPos = yPos;

        this.group.add(this.baseSprite);
        this.group.add(this.dialSprite);

        this.group.x(this.xPos);
        this.group.y(this.yPos);
        this.group.offsetX(Sundial.defaultDialRadius);
        this.group.visible(true);
    }


    getHeight(): number {
        return this.height;
    }

    setHeight(height: number) {
        if (height != null) {
            // Clamp to -1 -> 1 range for visual offset
            this.height = Math.min(Math.max(height, -1), 1);
            let visualHeight = height*Sundial.defaultHeightRange;
            this.dialSprite.y(visualHeight);
            this.baseSprite.y(visualHeight);
            this.baseSprite.height(Sundial.defaultBaseHeight - visualHeight);
        }
    }

    getGroup(): Konva.Group {
        return this.group;
    }
}
