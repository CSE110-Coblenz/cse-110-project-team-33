// import statements
import Konva from "konva";
// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";
import { Room3View } from "./Views/Room3View.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3View implements View {
    // groups for each
    private group: Konva.Group;
    private room_group: Konva.Group;
    private puzzle_group: Konva.Group;

    private clue: Konva.Image;
    private puzzle: Level3PuzzleView;

    private room_view: Room3View;

    constructor() {
        // initialize everything

        this.group = new Konva.Group({visible: false});
        this.room_group = new Konva.Group({visible: false});
        this.puzzle_group = new Konva.Group({visible: false});

        this.clue = new Konva.Image();

        this.room_view = new Room3View; // **change this to be the hint view -> get rid of room view maybe or change it to puzzle view idk yet
        this.puzzle = new Level3PuzzleView();

        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "purple", // Sky blue
        });
        this.puzzle_group.add(bg);

        // ** testing to get something to display ** //
        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "purple", // Sky blue
        });
        this.group.add(background);

        // clue -> click on to show hint -> work on that later **
        Konva.Image.fromURL("/res/Clue.png", (image) => {
            image.width(100), image.height(100);

            image.x(50), image.y(450);

            this.clue = image;
            this.group.add(this.clue);
            
            // juice
            image.on('mouseover', () => {
                image.scale({ x: 1.1, y: 1.1 }); // Slightly enlarge the image
                image.getLayer()?.draw();
            });
            image.on('mouseout', () => {
                image.scale({ x: 1, y: 1 }); // Reset the image size
                image.getLayer()?.draw();
            });
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

        const test = new Konva.Rect({
            x: 0,
            y: 200,
            width: STAGE_WIDTH,
            height: 120,
            fill: "yellow", // Sky blue
        });
        this.group.add(test);

        // handle clicking on water **oh my god this fucking works**
        water.on('click', () => {
            this.group.add(this.room_view.getGroup());
            this.room_view.getGroup().moveToTop();
        });

        test.on('click', () => {
            this.group.add(this.puzzle.getGroup());
            this.puzzle.getGroup().moveToTop(); // handles going back and forth
        })

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