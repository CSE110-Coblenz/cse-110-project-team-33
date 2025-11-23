// import statements
import Konva from "konva";
// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";
import { HintView } from "./Views/HintView.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";
import { Stage } from "konva/lib/Stage";

export class Level3View implements View {
    // group displays room for level 3
    private group: Konva.Group;

    // every image that makes up the background
    private background: Konva.Image;
    private door: Konva.Image;
    private clue: Konva.Image;
    private water: Konva.Image;
    private puzzle: Level3PuzzleView;
    //private hint: HintView;
    private back: Konva.Image; // back button (?)
    private backpack: Konva.Image; // for inventory
    private coins: Konva.Image; // coins
    private status: boolean; // status of the puzzle

    constructor() {
        // initialize everything
        this.group = new Konva.Group({visible: false});

        // all images
        this.background = new Konva.Image();
        this.door = new Konva.Image();
        this.clue = new Konva.Image();
        this.water = new Konva.Image();
        this.back = new Konva.Image();
        this.backpack = new Konva.Image();
        this.coins = new Konva.Image();

        // OBSOLETE -> have ONLY instance of puzzle view be in the constructor (consistency)
        this.puzzle = new Level3PuzzleView();
        this.status = false; // this.puzzle.checkAnswer();
        //this.hint = new HintView();

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
            // beginning of adding all images to the group
            this.background = await this.loadImage("/res/Level3_bg.png", STAGE_WIDTH, STAGE_HEIGHT, 0, 0); // room background
            this.door = await this.loadImage("/res/locked_door.png", 150, 200, 325, 65); // door -> separate to click into next room

            const [backpack, coins] = await Promise.all([
                this.loadImage("/res/backpack.png", 50, 50, 5, 5),
                this.loadImage("/res/Coins.png", 50, 50, 100, 5)
            ]);

            const [water, back_button] = await Promise.all([
                this.loadImage("/res/Water_layer.png", STAGE_WIDTH, 150, 0, 300),
                this.loadImage("/res/arrow.png", 100, 100, 0, 500)
            ])

            //this.water = await this.loadImage("/res/Water_layer.png", STAGE_WIDTH, 150, 0, 300);
            //this.back = await this.loadImage("/res/arrow.png", 100, 100, 0, 500);

            this.backpack = backpack;
            this.coins = coins;
            this.water = water;
            this.back = back_button;

            /*
            // THIS WORKS -> PUT BACK IF THINGS ARENT WORKING
            await this.loadRoom();
    
            await Promise.all([
                    // add images to put on top of background
                    this.loadDoor(),
                    this.loadWater(),
                    this.loadClue(),
                    this.loadBack(),
                    this.loadBackpack()
            ]);
            */
    
            this.group.getLayer()?.batchDraw();
    
            } catch (error) {
                console.error("Error loading images:", error);
        }
    }

    // beginning of old load image functions -> using only the general one now //

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
                    //this.group.add(this.hint.getGroup());
                    //this.hint.getGroup().moveToTop();
                });
                this.group.add(this.clue);

                resolve();
            }, reject);
        });
    }
    // end of old load image functions -> using only the general one now //

    // general function to load in an image
    private loadImage(src: string, width: number, height: number, x: number, y: number): Promise<Konva.Image> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL(src, (image) => {
                image.width(width);
                image.height(height);
                image.x(x);
                image.y(y);
                image.listening(true); // Enable events
                
                // add to the background group
                this.group.add(image);
                resolve(image); // Return the actual image
            }, reject)
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

    getWaterLayer(): Promise<void> {
        return this.loadWater();
    }

    getStatus(): boolean {
        return this.status;
    }

    setStatus(): void {
        this.status = this.puzzle.checkAnswer();
    }
}