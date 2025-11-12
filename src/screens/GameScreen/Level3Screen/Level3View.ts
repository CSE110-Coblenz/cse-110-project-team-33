// import statements
import Konva from "konva";
// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3View implements View {
    private group: Konva.Group;

    // make elements its own group and then add that group to overall view group
    //private bg: Konva.Image

    private clue: Konva.Image;
    private puzzle: Level3PuzzleView;

    constructor() {
        // initialize everything
        this.group = new Konva.Group({visible: false});
        //this.bg = new Konva.Image();
        this.clue = new Konva.Image();
        this.puzzle = new Level3PuzzleView();
        //this.water = new Konva.Image();
        //this.door = new Konva.Image();
        // this.rocks = new Konva.Image(); -> how to do array of konva images??**
        this.group = new Konva.Group;
        this.clue = new Konva.Image;

        // ** testing to get something to display ** //
        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "purple", // Sky blue
        });
        this.group.add(background);

        // room background -> replace image**
        Konva.Image.fromURL("/res/Level3Default.png", (image) => {
            image.width(STAGE_WIDTH);
            image.height(STAGE_HEIGHT);
            
            //this.bg = image;
            //this.group.add(this.bg);
        });

        // clue -> click on to show hint -> work on that later **
        Konva.Image.fromURL("/res/Clue.png", (image) => {
            image.width(100), image.height(100);

            image.x(50), image.y(475);

            this.clue = image;
            this.group.add(this.clue);
        });

        // water -> click on to show puzzle -> work on that later**
        const water = new Konva.Rect({
            x: 0,
            y: 300,
            width: STAGE_WIDTH,
            height: 120,
            fill: "blue", // Sky blue
        });
        this.group.add(water);

        // handle clicking on water
        water.on('click', () => {
            this.group.add(this.puzzle.getGroup());
        });

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