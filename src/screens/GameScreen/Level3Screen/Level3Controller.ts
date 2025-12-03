import Konva from "konva";

// import Level 3's view and model
import { Level3Model } from "./Level3Model.ts";
import { Level3View } from "./Level3View.ts";

// add playerdata
import { PlayerDataManager } from "../../../managers/GameStateManager.ts";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
// import { InventoryController } from "../../InventoryScreen/InventoryController.ts";
import { TrigUtil } from "../../../utilities/TrigUtil.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";

export class Level3Controller extends ScreenController {
    private group: Konva.Group;
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;
    private playerDataManager: PlayerDataManager;
    private crystalTrig: TrigUtil;

    // all the views
    private view: Level3View;

    private win_sound: HTMLAudioElement;

    // constructor
    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();

        // initialize all elements
        this.screenSwitcher = screenSwitcher;
        this.playerDataManager = playerDataManager;
        this.crystalTrig = new TrigUtil(); // needed for the crystal
        this.group = new Konva.Group({visible: true});

        this.model = new Level3Model(playerDataManager);
        this.view = new Level3View(playerDataManager);

        this.win_sound = new Audio("/res/sounds/winner.wav");
        this.win_sound.volume = 0.2;
        
        //this.view.show(); 
        this.initialize();
    }

    private async initialize(): Promise<void> {
        // show the room view for level 3 (level3View)
        await this.view.getloadBackground();

        // set up all interactable objects
        this.setUpInteractable();
    }

    /**
     * set up all the clickable elements:
     * 1. view
     *      - door (to click into next level)
     *      - water (to click into the close up view of the puzzle)
     *      - backpack (to view inventory)
     * 2. puzzle_view
     *      - 
     */
    private setUpInteractable(): void {
        // first get all of the images
        const doorImg = this.view.getDoor(); // door into next level if the answer is correct
        const backpackImg = this.view.getBackpack(); // click into the inventory
        const waterImg = this.view.getWater(); // click into the puzzle view
        const back_button = this.view.getBack();
        const clue = this.view.getClue();
        const crystal = this.view.getCrystal();

        // add interactions to each image
        this.handleInteractable(doorImg, "door");
        this.handleInteractable(backpackImg, "backpack");
        this.handleInteractable(waterImg, "puzzle");
        this.handleInteractable(back_button, "prev_level");
        this.addMoveBehavior(clue, "clue");
        this.addMoveBehavior(crystal, "crystal");
    }

    /**
     * handle clicking on different elements:
     * put everything in controller to handle one instance of every class
     */
    private handleInteractable(node: any, action?: string): void {
        // change style of cursor to denote clickable elements
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });

        node.on("click", () => {
            // check which action was clicked on
            if(action == "backpack"){ // open inventory
                console.log("backpack clicked from controller");
                this.screenSwitcher.switchToScreen({type: "inventory"});
                this.playerDataManager.setLevel({type: "level3"});
            } else if (action == "door") {
                console.log(this.model.getInventory());

                /**
                 * check if puzzle was solved
                 * if solved:
                 * - add 50 coins to inventory
                 * - add crystal to inventory
                 * - sallow to move on to next level
                 * else:
                 * - trigger alert implying puzzle not solved yet
                 */
                if(this.view.isSolved()){
                    // this.win_sound.play();
                    // this.view.triggerAlert("I made it across!");
                    this.playerDataManager.setCoins(600);
                    this.screenSwitcher.switchToScreen({type: "level4"}); // should be level 4 in future
                }
                else {
                    this.view.triggerAlert("I'm not across yet...");
                }
            } else if (action == "puzzle") { // display the level's puzzle
                // console.log("puzzle displaying");
                this.view.switchToPuzzle();
                this.view.triggerAlert("I have to find the right path...");
            } else if (action == "prev_level") { // change the player's level to the previous level
                // switch to the previous level screen
                this.screenSwitcher.switchToScreen({type: "level2"}); // should be level 2 in future
            }
        });

    } // end of handleInteractable function

    // ** function to handle dragging object into inventory ** //
    private addMoveBehavior(node: Konva.Image, action: string): void {
        node.draggable(true);
        
        // Constrain dragging within stage boundaries
        node.dragBoundFunc(function(pos) {
            const nodeWidth = node.width();
            const nodeHeight = node.height();
            
            // Calculate boundaries
            const minX = 0;
            const minY = 0;
            const maxX = STAGE_WIDTH - nodeWidth;
            const maxY = STAGE_HEIGHT - nodeHeight;
            
            // Constrain position
            const newX = Math.max(minX, Math.min(pos.x, maxX));
            const newY = Math.max(minY, Math.min(pos.y, maxY));
            
            return {
                x: newX,
                y: newY
            };
        });
        
        // change cursor to signal if an object is interactable
        node.on("mouseover", () => {
            document.body.style.cursor = "grab";
        });
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("dragstart", () => {
            if(action == "clue"){
                this.view.triggerAlert("I think this is a clue!");
            } else if(action == "crystal"){
                this.view.triggerAlert("A crystal...?");
            }
            document.body.style.cursor = "grabbing";
            console.log("drag start");
        });
        
        node.on("dragmove", () => {
            const pos = node.position();
        });
        
        // check if when the cursor is let go, if the object is "over" the back to put it into the inventory
        node.on("dragend", () => {
            document.body.style.cursor = "grab";
            console.log("drag end");
            
            const pos = node.position();

            if (pos.x <= 50 && pos.y <= 50){
                // add the node into the inventory depending on identifier
                if(action == "clue") { // adds clue visual to inventory
                    this.model.addToInventory({
                        name: "clue",
                        image: "level3clue.png",
                        width: 700,
                        height: 525
                    });
                } else if (action == "crystal") { // adds crystal visual to inventory
                    this.model.addToInventory({
                        name: "crystal",
                        image: "crystal.png",
                        width: 300,
                        height: 350,
                        text1: this.crystalTrig.randomTrigCoordinate(),
                        text1X: STAGE_WIDTH / 2 + 20,
                        text1Y: STAGE_HEIGHT / 2 - 10
                    });
                }

                // Remove the node from the stage
                node.destroy();
                node.getLayer()?.batchDraw();
            }

            // node.destroy();
            node.getLayer()?.batchDraw();
            });
    }

    // get the view group
    getView(): Level3View {
        return this.view;
    }
}