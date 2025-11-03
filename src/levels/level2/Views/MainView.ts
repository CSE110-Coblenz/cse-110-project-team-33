import Konva from "konva";
import { Sundial } from "../ViewElements/Sundial.ts";
import { Door } from "../ViewElements/Door.ts";
import {STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
export class MainView {
    private group: Konva.Group;

    public sundial1: Sundial;
    public sundial2: Sundial;
    public sundial3: Sundial;
    private door: Door;
    private bg: Konva.Rect;

    constructor(): MainView {
        this.group = new Konva.Group();

        // Create main area view
        this.bg = new Konva.Rect({
            x: 0, y :0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#ffe066"
        });

        this.sundial1 = new Sundial(STAGE_WIDTH/2 - 128 , STAGE_HEIGHT/2, 0, "sundial1");
        this.sundial2 = new Sundial(STAGE_WIDTH/2       , STAGE_HEIGHT/2, 0, "sundial2");
        this.sundial3 = new Sundial(STAGE_WIDTH/2 + 128 , STAGE_HEIGHT/2, 0, "sundial3");
        this.door = new Door(STAGE_WIDTH/2, 0);

        // The order matters here(?)
        this.group.add(this.bg);
        this.group.add(this.sundial1.getGroup());
        this.group.add(this.sundial2.getGroup());
        this.group.add(this.sundial3.getGroup());
        this.group.add(this.door.getGroup());
        
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
