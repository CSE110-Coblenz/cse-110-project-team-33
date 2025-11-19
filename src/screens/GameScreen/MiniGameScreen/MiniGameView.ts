import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class MiniGameView {
    public layer: Konva.Layer;
    private group: Konva.Group;
    centerX = STAGE_WIDTH/2;
    centerY = STAGE_HEIGHT/2;
    radius = 150;


    constructor() {
        this.group = new Konva.Group({ visible: false });

        this.layer = new Konva.Layer();
        this.group = new Konva.Group();
        this.layer.add(this.group);

        // background
        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#87DEEB",
        });
        this.group.add(bg);
    }

    getLayer(): Konva.Layer {
        return this.layer;
    }

    /**
     * Show the screen
     */
    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    /**
     * Hide the screen
     */
    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup(): Konva.Group {
        return this.group;
    }

    drawBase() {
        const circle = new Konva.Circle({
            x: this.centerX,
            y: this.centerY,
            radius: this.radius,
            stroke: "black",
            fill: "#ede8d0",
            strokeWidth: 2,
        });

        const xAxis = new Konva.Line({
            points: [this.centerX - this.radius - 20, this.centerY, this.centerX + this.radius + 20, this.centerY],
            stroke: "#aaa",
        });

        const yAxis = new Konva.Line({
            points: [this.centerX, this.centerY - this.radius - 20, this.centerX, this.centerY + this.radius + 20],
            stroke: "#aaa",
        });

        this.group.add(circle, xAxis, yAxis);
        this.layer.draw();
    }


    createDraggableLabel(text: string, x: number, y: number): Konva.Text {
        const label = new Konva.Text({
            x,
            y,
            text,
            fontSize: 20,
            fill: "black",
            draggable: true,
        });
        this.group.add(label);
        return label;
    }

    updateLabelColor(labelNode: Konva.Text, placed: boolean) {
        labelNode.fill(placed ? "green" : "black");
        labelNode.draggable(placed ? false : true);
        this.layer.batchDraw();
    }

}
