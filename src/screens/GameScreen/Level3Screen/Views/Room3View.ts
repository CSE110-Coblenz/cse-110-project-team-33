import Konva from "konva";
import { Level3PuzzleView } from "./Level3PuzzleView";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants";
import type { SubView } from "./Subview.ts";

export class Room3View implements SubView {
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
/*
    pushToScreen(parView: SubView): void {
        this.parentView = parView;
        this.parentView.hide();
        this.show();
    }

    popFromScreen(): void {
        this.hide();
        this.parentView.show();
    }
*/
}