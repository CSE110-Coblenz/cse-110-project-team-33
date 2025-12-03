// import statements
import Konva from "konva";

// import different views
import type { View } from "../../../types.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";

// import player data to display inventory and coins
import { PlayerDataManager } from "../../../managers/GameStateManager";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

// handle any text pop ups
import { TextPopUp } from "./Views/TextPopUp.ts";

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
    private crystal: Konva.Image;
    private status: boolean; // status of the puzzle

    // player data to display updated values
    private player_data: PlayerDataManager;

    // text alerts -> not working ** maybe figure out later **
    private alert: TextPopUp;

    constructor(playerDataManager: PlayerDataManager) {
        // initialize everything
        this.group = new Konva.Group({visible: false});
        this.text_group = new Konva.Group();
        this.alert = new TextPopUp("level3_alerts");

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
        this.crystal = new Konva.Image();

        // level 3 -> level 3 puzzle (access from level 3 since no other level needs level 3's puzzle info)
        this.puzzle = new Level3PuzzleView();
        this.status = false; // this.puzzle.checkAnswer();

        console.log(this.player_data.getCoins())

        this.coins_text = new Konva.Text({
            x: 115,
            y: 20,
            text: String(100),
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
            this.background = await this.loadImage("/res/room.png", STAGE_WIDTH, STAGE_HEIGHT, 0, 0); // room background

            // ** water, backpack, door, clue ** // 
            const [backpack, water, door, back_button, coins] = await Promise.all([
                this.loadImage("/res/backpack.png", 50, 50, 5, 5),
                this.loadImage("/res/Water_layer.png", STAGE_WIDTH, 150, 0, 300),
                this.loadImage("/res/locked_door.png", 150, 200, 325, 65), // door -> separate to click into next room
                this.loadImage("/res/arrow.png", 100, 100, 0, 500),
                this.loadImage("/res/Coins.png", 50, 50, 60, 5)
            ])

            // clue and the crystal
            this.crystal = await this.loadImage("/res/crystal.png", 30, 40, 600, 475);
            this.clue = await this.loadImage("/res/paper.png", 80, 70, 150, 475);

            // asign images to the object's variables
            this.backpack = backpack;
            this.coins = coins;
            this.door = door;
            this.water = water;
            this.back = back_button;
            this.group.add(this.coins_text);

            // add alert placeholder to group
            this.group.add(this.alert.getElement());
    
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

    getCrystal(): Konva.Image {
        return this.crystal;
    }

    // load the background -> needed for controller to control the view
    getloadBackground(): Promise<void> {
        return this.loadBackground();
    }

    getStatus(): boolean {
        return this.status;
    }

    isSolved(): boolean {
        // this.status = this.puzzle.checkAnswer();
        return this.puzzle.checkAnswer();
    }

    switchToPuzzle(): void {
        this.group.add(this.puzzle.getGroup());
        this.puzzle.getGroup().moveToTop();
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

    // trigger a text alert
    triggerAlert(text: string) {
        this.alert.getElement().moveToTop();
        this.alert.triggerAlert(text);
    }
}