import Konva from "konva";
//import { Level3PuzzleView } from "./Level3PuzzleView";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";
import type { View } from "../../../../types.ts";

export class Room3View implements View {
    // variables/elements
    private group: Konva.Group;
    private clue: Konva.Image;
    //private parentView: SubView;

    constructor(){
        this.group = new Konva.Group;
        this.clue = new Konva.Image;

        // ** testing to get something to display ** //
        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "purple",
        });
        this.group.add(background);

        const test = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH / 2,
            height: STAGE_HEIGHT / 2,
            fill: "blue",
        });
        this.group.add(test);

        test.on('click', () => {
            this.group.moveToBottom();
            this.group.getLayer()?.draw();
        })
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

    /**
     * returns this group
     */
    getGroup(): Konva.Group {
        return this.group;
    }
}