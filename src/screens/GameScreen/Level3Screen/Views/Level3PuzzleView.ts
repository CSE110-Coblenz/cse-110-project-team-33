// import statements
import Konva from "konva";
import type { View } from "../../../../types.ts";
import type { ScreenSwitcher } from "../../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";

export class Level3PuzzleView implements View {
    // elements
    private group: Konva.Group; // whole view
    private rock: Konva.Image;
    //private room: Level3View;

    // constructor
    constructor() {
        this.group = new Konva.Group;
        this.rock = new Konva.Image;
        //this.room = new Level3View;

        const background = new Konva.Rect({
            x: 0,
            y: 0,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
            fill: "#D6E8FF", // Sky blue
        });
        this.group.add(background);

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(100), image.height(100);

            image.x(50), image.y(475);

            this.rock = image;
            this.group.add(this.rock);
        });

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

    getGroup(): Konva.Group {
        return this.group;
    }
}