import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class InventoryView {
    private group: Konva.Group;
    private inventory: string[];

    constructor() {
        this.group = new Konva.Group({ visible: false });
        this.inventory = [];
    }

    updateInventory(inventory: string[]): void {
        this.inventory = inventory;
        this.renderInventory();
    }
    
    renderInventory() {
        this.inventory.forEach((item, index) => {
            const itemText = new Konva.Text({
                x: STAGE_WIDTH / 2,
                y: STAGE_HEIGHT / 2 + index * 50,
                text: item,
                fontSize: 24,
                fontFamily: "Arial",
                fill: "black",
                align: "center"
            });

            this.group.add(itemText);
        });
        this.group.getLayer()?.draw();
    }

    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup(): Konva.Group {
        return this.group;
    }
}