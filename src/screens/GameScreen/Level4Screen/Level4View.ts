import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level4View {
    public layer: Konva.Layer;
    private group: Konva.Group;
    centerX = STAGE_WIDTH/2;
    centerY = STAGE_HEIGHT/2;
    radius = 150;


    constructor() {
        this.layer = new Konva.Layer();
        this.group = new Konva.Group({ visible: false });
        this.layer.add(this.group);

        // background
        Konva.Image.fromURL("/res/level4background.png", (image) => {
            this.group.add(image);
            image.moveToBottom();
            this.layer.draw();
        });
        
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


    createDraggableLabel(text: string, x: number, y: number): Konva.Group {
        const crystal = new Konva.Group({
            x, 
            y, 
            draggable: true
        });
        const label = new Konva.Text({
            text,
            fontSize: 15,
            fontFamily: 'Margarine',
            fontStyle: 'bold',
            fill: "black",
            offsetX: 0, 
            offsetY: 30
        });
        crystal.add(label);
        Konva.Image.fromURL("/res/crystal.png", (image) => {
            image.width(20);
            image.height(30);
            crystal.add(image);
            this.layer.draw();
        });
        this.group.add(crystal);
        return crystal;
    }

    updateLabelColor(labelNode: Konva.Group, placed: boolean) {
        const label = labelNode.findOne("Text");
        label.fill(placed ? "green" : "black");
        labelNode.draggable(placed ? false : true);
        this.layer.batchDraw();
    }

}
