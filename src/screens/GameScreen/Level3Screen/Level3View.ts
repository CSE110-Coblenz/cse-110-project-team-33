// import statements
import Konva from "konva";
import type { View } from "../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

export class Level3View implements View {
    private group: Konva.Group;

    // make elements its own group and then add that group to overall view group
    //private bg: Konva.Image
    //private clue: Konva.Image;
    //private puzzle: Level3PuzzleView;

    constructor() {
        // initialize everything
        this.group = new Konva.Group({visible: false});
        //this.bg = new Konva.Image();
        //this.clue = new Konva.Image();
        //this.puzzle = new Level3PuzzleView();
        //this.water = new Konva.Image();
        //this.door = new Konva.Image();
        // this.rocks = new Konva.Image(); -> how to do array of konva images??**


    }// end of constructor

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