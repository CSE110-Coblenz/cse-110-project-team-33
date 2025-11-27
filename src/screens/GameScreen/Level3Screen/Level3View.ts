// import statements
import Konva from "konva";

// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

// import player data to display inventory and coins
import { PlayerDataManager } from "../../../GameStateManager.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3View implements View {
    // group displays room for level 3
    private group: Konva.Group;
    private text_group: Konva.Group;

    // every image that makes up the background
    private background: Konva.Image;
    private door: Konva.Image;
    private clue: Konva.Image;
    private water: Konva.Image;
    private puzzle: Level3PuzzleView;
    private back: Konva.Image; // back button (?)
    private backpack: Konva.Image; // for inventory
    private coins: Konva.Image; // coins
    private coins_text: Konva.Text;
    private status: boolean; // status of the puzzle

    // player data to display updated values
    private player_data: PlayerDataManager;

    constructor(playerDataManager: PlayerDataManager) {
        // initialize everything
        this.group = new Konva.Group({visible: false});
        this.text_group = new Konva.Group();

        // player data
        this.player_data = playerDataManager;

        // all images
        this.background = new Konva.Image();
        this.door = new Konva.Image();
        this.clue = new Konva.Image();
        this.water = new Konva.Image();
        this.back = new Konva.Image();
        this.backpack = new Konva.Image();
        this.coins = new Konva.Image();
        this.coins_text = new Konva.Text();

        // OBSOLETE -> have ONLY instance of puzzle view be in the constructor (consistency)
        this.puzzle = new Level3PuzzleView();
        this.status = false; // this.puzzle.checkAnswer();

        console.log(this.player_data.getCoins())

        this.coins_text = new Konva.Text({
            x: 115,
            y: 20,
            text: String(this.player_data.getCoins()),
            fontSize: 20,
            fontFamily: "Press Start 2P",
            fill: "black",
        });
        this.text_group.add(this.coins_text);
    }// end of constructor

    getView(): Level3View {
        return this;
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

    // promises for the images to appear
    // functions
    private async loadBackground(): Promise<void> {
        try {
            // beginning of adding all images to the group
            this.background = await this.loadImage("/res/Level3_bg.png", STAGE_WIDTH, STAGE_HEIGHT, 0, 0); // room background
            // this.door = await this.loadImage("/res/locked_door.png", 150, 200, 325, 65, true); // door -> separate to click into next room

            // ** water, backpack, door, clue ** // 
            const [backpack, water, door, back_button, coins] = await Promise.all([
                this.loadImage("/res/backpack.png", 50, 50, 5, 5),
                this.loadImage("/res/Water_layer.png", STAGE_WIDTH, 150, 0, 300),
                this.loadImage("/res/locked_door.png", 150, 200, 325, 65), // door -> separate to click into next room
                this.loadImage("/res/arrow.png", 100, 100, 0, 500),
                this.loadImage("/res/Coins.png", 50, 50, 60, 5)
            ])

            this.clue = await this.loadImage("/res/Clue.png", 100, 100, 150, 475);

            this.backpack = backpack;
            this.coins = coins;
            this.door = door;
            this.water = water;
            this.back = back_button;
            // this.clue = clue;
            this.group.add(this.coins_text);
    
            this.group.getLayer()?.batchDraw();
            } catch (error) {
                console.error("Error loading images:", error);
        }
    }

    // general function to load in an image
    private loadImage(src: string, width: number, height: number, x: number, y: number): Promise<Konva.Image> {
        return new Promise((resolve, reject) => {
            Konva.Image.fromURL(src, (image) => {
                image.width(width);
                image.height(height);
                image.x(x);
                image.y(y);
                image.listening(true); // Enable events

                // check string -> if its a specific string then give it certain interactions
                if(src == "/res/Water_layer.png"){
                    image.on('click', () => {
                        console.log(this.coins_text);
                        console.log("this is the water"); // this works -> consider moving all events into this load image

                        this.showClickable(image);

                        this.group.add(this.puzzle.getGroup());
                        this.puzzle.getGroup().moveToTop();
                    })
                }
                if(src == "/res/backpack.png"){
                    image.on('click', () => {
                        console.log("backpack from level 3 view"); // this works -> consider moving all events into this load image
                        this.showClickable(image);
                    })
                }
                if(src == "/res/Clue.png"){
                    image.on('click', () => {
                        console.log("clicked from level 3 view");
                    })
                }
                
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

    getClue(): Konva.Image {
        return this.clue;
    }

    testingReturn(): void {
        this.loadImage("/res/backpack.png", 50, 50, 5, 5);
    }

    // load the background -> needed for controller to control the view
    getloadBackground(): Promise<void> {
        return this.loadBackground();
    }

    getStatus(): boolean {
        return this.status;
    }

    setStatus(): void {
        this.status = this.puzzle.checkAnswer();
    }

    // change cursor to a pointer to show its clickable
    showClickable(node: any): void {
        node.on('mouseover', () => {
            document.body.style.cursor = "pointer";
        });
        node.on('mouseout', () => {
            document.body.style.cursor = "default";
        });
    }
}