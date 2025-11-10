import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class Level2View {
    private group: Konva.Group;

    constructor() {
        this.group = new Konva.Group({visible: false});
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

    addToGroup(viewGroup: Konva.Group): void {
        this.group.add(viewGroup);
    }
}
