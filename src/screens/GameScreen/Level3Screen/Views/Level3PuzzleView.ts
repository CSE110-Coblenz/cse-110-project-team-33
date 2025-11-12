// import statements
import Konva from "konva";
//import type { View } from "../../../../types.ts";
import type { SubView } from "./Subview.ts";
import type { ScreenSwitcher } from "../../../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../../constants.ts";

export class Level3PuzzleView implements SubView {
    // elements
    private group: Konva.Group; // whole view
    private rock: Konva.Image;
    // all rocks (5)
    private rock1: Konva.Image;
    private rock2: Konva.Image;
    private rock3: Konva.Image;
    private rock4: Konva.Image;
    private rock5: Konva.Image;

    private water: Konva.Image;
    private chosen: Konva.Image;

    //private room: Level3View;

    // constructor
    constructor() {
        this.group = new Konva.Group;
        // all 5 rocks
        this.rock1 = new Konva.Image;
        this.rock2 = new Konva.Image;
        this.rock3 = new Konva.Image;
        this.rock4 = new Konva.Image;
        this.rock5 = new Konva.Image;

        // test rock
        this.rock = new Konva.Image;

        this.water = new Konva.Image;
        this.chosen = new Konva.Image; // image of selected rock
        //this.room = new Level3View;

        // water background
        Konva.Image.fromURL("/res/Water.png", (image) => {
            image.width(STAGE_WIDTH), image.height(STAGE_HEIGHT);

            //image.x(50), image.y(475);

            this.water = image;
            this.group.add(this.water);
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(70), image.y(0);

            this.rock = image;
            //this.group.add(this.rock);
            //this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(170), image.y(425);

            this.rock1 = image;
            this.group.add(this.rock1);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 - 80), image.y(STAGE_HEIGHT / 2 - 50);

            this.rock2 = image;
            this.group.add(this.rock2);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 - 220), image.y(STAGE_HEIGHT / 2 - 240);

            this.rock3 = image;
            this.group.add(this.rock3);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 + 150), image.y(STAGE_HEIGHT / 2 - 180);

            this.rock4 = image;
            this.group.add(this.rock4);
            this.group.draw; // makes sure rock displays
        });

        Konva.Image.fromURL("/res/Rock.png", (image) => {
            image.width(120), image.height(120);

            image.x(STAGE_WIDTH / 2 + 170), image.y(STAGE_HEIGHT / 2 + 80);

            this.rock5 = image;
            this.group.add(this.rock5);
            this.group.draw; // makes sure rock displays
        });

        // "back button" -> rectangle for now
        const back = new Konva.Rect({
            x: STAGE_WIDTH,
            y: STAGE_HEIGHT,
            width: 100,
            height: 50,
            fill: "red", // Sky blue
        });
        this.group.add(back);
        //this.group.draw;

        this.rock1.on('click', () => {
            this.group.hide();
        })
    
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

    pushToScreen(parView: SubView): void {
        this.parentView = parView;
        this.parentView.hide();
        this.show();
    }

    popFromScreen(): void {
        this.hide();
        this.parentView.show();
    }
}