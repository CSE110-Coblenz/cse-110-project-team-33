import Konva from "konva";

export class InventoryView {
    private group: Konva.Group;

    constructor() {
        this.group = new Konva.Group({ visible: false });
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