// import statements
import Konva from "konva";
// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3View implements View {
    // groups for each
    private group: Konva.Group;
    //private room_group: Konva.Group;
    //private puzzle_group: Konva.Group;

    private background: Konva.Image;
    private door: Konva.Image;
    private clue: Konva.Image;
    private water: Konva.Image;
    private puzzle: Level3PuzzleView;

    constructor() {
        // initialize everything
        this.group = new Konva.Group({visible: false});
        //this.room_group = new Konva.Group({visible: false});
        //this.puzzle_group = new Konva.Group({visible: false});

        // all images
        this.background = new Konva.Image();
        this.door = new Konva.Image();
        this.clue = new Konva.Image();
        this.water = new Konva.Image();

        this.puzzle = new Level3PuzzleView();

        // load the room background and all its elements
        this.loadBackground();

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

    // promises for the images to appear
    // functions
    private async loadBackground(): Promise<void> {
        try {
            await this.loadRoom();
    
            await Promise.all([
                    // add images to put on top of background
                    this.loadDoor(),
                    this.loadWater(),
                    this.loadClue()
            ]);
    
            this.group.getLayer()?.batchDraw();
    
            } catch (error) {
                console.error("Error loading images:", error);
        }
    }

    // load background
    private async loadRoom(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/Level3_bg.png", (image) => {
                image.width(STAGE_WIDTH);
                image.height(STAGE_HEIGHT);
                this.background = image;
                this.group.add(this.background);
                resolve();
            }, reject);
        });
    }

    // load door
    private async loadDoor(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/locked_door.png", (image) => {
                image.width(150);
                image.height(200);
                image.x(325);
                image.y(65);
                this.door = image;
                this.group.add(this.door);
                resolve();
            }, reject);
        });
    }

    // load water_layer
    private async loadWater(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/Water_layer.png", (image) => {
                image.width(STAGE_WIDTH);
                image.height(150);
                image.y(300)
                this.water = image;
                this.group.add(this.water);

                // handle clicking to the puzzle view
                this.water.on('click', () => {
                    this.group.add(this.puzzle.getGroup());
                    this.puzzle.getGroup().moveToTop();
                });
                this.group.add(this.water);
                
                resolve();
            }, reject);
        });
    }
    // load clue image
    private async loadClue(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/Clue.png", (image) => {
                image.width(100), image.height(100);
                image.x(50), image.y(475);

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

                resolve();
            }, reject);
        });
    }

    // load backpack image

    // load coins image
}