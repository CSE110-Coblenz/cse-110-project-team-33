// import statements
import Konva from "konva";
// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";
import { HintView } from "./Views/HintView.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3View implements View {
    // groups for each
    private group: Konva.Group;
    //private screenSwitcher: ScreenSwitcher;
    //private room_group: Konva.Group;
    //private puzzle_group: Konva.Group;

    private background: Konva.Image;
    private door: Konva.Image;
    private clue: Konva.Image;
    private water: Konva.Image;
    private puzzle: Level3PuzzleView;
    private hint: HintView;
    private back: Konva.Image;
    private backpack: Konva.Image;

    constructor() {
        // initialize everything
        this.group = new Konva.Group({visible: false});
        //this.screenSwitcher = new this.screenSwitcher;
        //this.room_group = new Konva.Group({visible: false});
        //this.puzzle_group = new Konva.Group({visible: false});

        // all images
        this.background = new Konva.Image();
        this.door = new Konva.Image();
        this.clue = new Konva.Image();
        this.water = new Konva.Image();
        this.back = new Konva.Image();
        this.backpack = new Konva.Image();

        this.puzzle = new Level3PuzzleView();
        this.hint = new HintView();

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
                    this.loadClue(),
                    this.loadBack(),
                    this.loadBackpack()
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
                image.listening(true);

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
                image.listening(true);
                
                this.water = image;
                this.group.add(this.water);

                // juice
                image.on('mouseover', () => {
                    document.body.style.cursor = "pointer";
                });
                image.on('mouseout', () => {
                    document.body.style.cursor = "default";
                });

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
                image.listening(true);

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
                // handle clicking to the hint view
                image.on('click', () => {
                    this.group.add(this.hint.getGroup());
                    this.hint.getGroup().moveToTop();
                });
                this.group.add(this.water);

                resolve();
            }, reject);
        });
    }

    // load backpack image
     private async loadBackpack(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/backpack.png", (image) => {
                // dimensions
                image.width(50);
                image.height(50);
                image.x(5);
                image.y(5);
                image.listening(true);

                // set image and add to group
                this.backpack = image;
                this.group.add(this.backpack);

                resolve();
            }, reject);
        });
    }   

    // load coins image

    // load back button to return to level 2 (?)
    private async loadBack(): Promise<void> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL("/res/arrow.png", (image) => {
                image.width(100);
                image.height(100);
                image.y(500);
                image.listening(true);
                this.back = image;
                this.group.add(this.back);

                // all click handlers
                // mouseover to show it's being hovered over to click
                this.back.on('mouseover', () => {
                    this.back.scale({ x: 1.1, y: 1.1 }); // Slightly enlarge the image
                    this.back.getLayer()?.batchDraw();
                });
                this.back.on('mouseout', () => {
                    this.back.scale({ x: 1, y: 1 }); // Reset the image size
                    this.back.getLayer()?.batchDraw();
                });
                // this.group.add(this.back);

                resolve();
            }, reject);
        });
    }

    // getters for every clickable/interactable image

    // the door -> to click to next level
    getDoor(): Konva.Image {
        return this.door;
    }

    // back button -> to move back to a previous screen
    getBack(): Konva.Image {
        return this.back;
    }

    // water -> to click into the puzzle
    getWater(): Konva.Image {
        return this.water;
    }

    // backpack -> to click into the inventory
    getBackpack(): Konva.Image {
        return this.backpack;
    }

    // load the background -> needed for controller to control the view
    getloadBackground(): Promise<void> {
        return this.loadBackground();
    }
}