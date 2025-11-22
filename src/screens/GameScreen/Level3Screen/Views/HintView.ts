/**
 * View of the hint for the puzzle
 */

// import statements
import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";
import type { View } from "../../../../types.ts";

export class HintView implements View {
    // variables/elements
    private group: Konva.Group;
    private clue: Konva.Image;

    // constructor
    constructor() {
        this.group = new Konva.Group;
        this.clue = new Konva.Image;

        // set the image of the clue

    }

    // functions
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