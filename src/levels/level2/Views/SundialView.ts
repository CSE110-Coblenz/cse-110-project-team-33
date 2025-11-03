import Konva from "konva";
import {STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class SundialView {

    static get sundialWidth()   { return STAGE_WIDTH/2; }
    static get sundialHeight()  { return STAGE_WIDTH/2; }

    private group: Konva.Group;

    private bg: Konva.Rect;
    private baseSprite: Konva.Rect;
    private dialSprite: Konva.Ellipse;

    // Turns out, the indicatory part of the sundial is called a 'Gnomon!'
    private gnomonSprite: Konva.Shape;

    constructor(): MainView {
        this.group = new Konva.Group();

        // Create main area view
        this.bg = new Konva.Rect({
            x: 0, y :0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#e6b800"
        });

        this.baseSprite = new Konva.Rect({
           x:STAGE_WIDTH/2,
           y:STAGE_HEIGHT/2,
           width: SundialView.sundialWidth, 
           height: SundialView.sundialHeight,
           offsetX: SundialView.sundialWidth/2,
           fill: "#444444"
        });

        this.dialSprite = new Konva.Ellipse({
           x:STAGE_WIDTH/2,
           y:STAGE_HEIGHT/2,
           radiusX: SundialView.sundialWidth/2, 
           radiusY: SundialView.sundialHeight/4,
           fill: "#222222"
            
        });

        this.gnomonSprite = new Konva.Shape({
            sceneFunc: function (context, shape) {
                context.beginPath();
                context.moveTo(SundialView.sundialWidth*0.25,0);
                context.lineTo(SundialView.sundialWidth*0.25, SundialView.sundialWidth/4);
                context.lineTo(SundialView.sundialWidth*0.75, SundialView.sundialHeight/4);
                context.lineTo(SundialView.sundialWidth*0.25, 0);
                context.closePath();
                context.fillStrokeShape(shape);
            },
            fill: "#888888",
            x: STAGE_WIDTH/2 - SundialView.sundialWidth/2,
            y: STAGE_HEIGHT/2 - SundialView.sundialHeight/4,
        });
        // The order matters here(?)
        this.group.add(this.bg);
        this.group.add(this.baseSprite);
        this.group.add(this.dialSprite);
        this.group.add(this.gnomonSprite);

        this.hide();
    }

    show(): void {
        this.group.visible(true);
    }

    hide(): void {
        this.group.visible(false);
    }

    getGroup(): Konva.Group {
        return this.group;
    }

}
