// import statements
import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import { PlayerDataManager } from "../../GameStateManager"; // need player data to handle displaying it

export class ResultsView implements View {
    // ** variables ** //
    private group: Konva.Group;
    private room_group: Konva.Group;
    private text_group: Konva.Group;
    private playerData: PlayerDataManager;
    
    // all images
    private bg: Konva.Image; // room background
    private menu_button: Konva.Image;
    private exit_button: Konva.Image;
    private backpack: Konva.Image;
    private coins: Konva.Image; // to display number of coins earned
    private crystal: Konva.Image; // to display number of crystals found
    private pedestal: Konva.Image; // display the crystal on top of -> one final completion crystal
    private minigame: boolean; // display if the minigame was completed?

    // constructor
    constructor(playerDataManager: PlayerDataManager) {
        this.group = new Konva.Group({visible: false});
        this.room_group = new Konva.Group({visible: false});
        this.text_group =  new Konva.Group({visible: false});
        this.bg = new Konva.Image();
        this.menu_button = new Konva.Image();
        this.exit_button = new Konva.Image();
        this.coins = new Konva.Image();
        this.crystal = new Konva.Image();
        this.pedestal = new Konva.Image();
        this.backpack = new Konva.Image();
        this.playerData = playerDataManager;
        this.minigame = false;
    }// end of consturctor

    private async loadBackground(): Promise<void> {
        try {
            // load in background
            this.bg = await this.loadImage("/res/room.png", STAGE_WIDTH, STAGE_HEIGHT, 0, 0); // room background

            // load in all the images
            const [pedestal, crystal, backpack, coins] = await Promise.all([
                this.loadImage("/res/Pillar.png", 200, 250, STAGE_WIDTH / 2 - 100, STAGE_HEIGHT / 2 - 70),
                this.loadImage("/res/crystal.png", 100, 120, STAGE_WIDTH / 2 - 50, STAGE_HEIGHT / 2 - 190),
                this.loadImage("/res/backpack.png", 50, 50, 5, 5),
                this.loadImage("/res/Coins.png", 50, 50, 60, 5)
            ])
            this.pedestal = pedestal;
            this.crystal = crystal;
            this.backpack = backpack;
            this.coins = coins;

            // add buttons (testing for now)
            this.exit_button = await this.loadImage("/res/exit.png", 300, 120, STAGE_WIDTH / 2 - 50, STAGE_HEIGHT - 105),
    
            this.group.getLayer()?.batchDraw();
            } catch (error) {
                console.error("Error loading images:", error);
        }
    }

    // function to load in images
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

    // functions (needed for implementing View)
    getGroup(): Konva.Group {
        return this.group;
    }

    show(): void {
        this.group.visible(true);
    }
    
    hide(): void {
        this.group.visible(false);
    }

    getBG(): Promise<void> {
        return this.loadBackground();
    }

    // getters for every interactable image
    getCrystal(): Konva.Image {
        return this.crystal;
    }

    getBackpack(): Konva.Image {
        return this.backpack;
    }

    displayResults(): void {
        // mini screen switcher, or just a group of images pop up (like show paper with results)
    }
}