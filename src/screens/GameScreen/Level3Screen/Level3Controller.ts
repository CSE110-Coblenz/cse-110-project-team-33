import Konva from "konva";

// import Level 3's view and model
import { Level3Model } from "./Level3Model.ts";
import { Level3View } from "./Level3View.ts";

// add playerdata
import { PlayerDataManager } from "../../../GameStateManager.ts";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { InventoryController } from "../../InventoryScreen/InventoryController.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../../constants.ts";


export class Level3Controller extends ScreenController {
    private group: Konva.Group;
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;
    private playerDataManager: PlayerDataManager;

    // all the views
    private view: Level3View;

    // constructor
    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();

        // initialize all elements
        this.screenSwitcher = screenSwitcher;
        this.playerDataManager = playerDataManager;
        this.group = new Konva.Group({visible: true});

        this.model = new Level3Model(playerDataManager);
        this.view = new Level3View(playerDataManager);
        
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

        //this.handleInteractable(backpackImg, "backpack");
        this.handleInteractable(doorImg, "door");
        this.handleInteractable(backpackImg, "backpack");
        this.handleInteractable(waterImg, "puzzle");
        this.handleInteractable(back_button, "prev_level");
        this.addMoveBehavior(clue, "clue");
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
            // check with action was clicked on
            if(action == "backpack"){
                console.log("backpack clicked from controller");
                this.screenSwitcher.switchToScreen({type: "inventory"});
            } else if (action == "door") {
                /**
                 * heck if the correct answer was input
                 * 1. change door image
                 * 2. add 50 coins
                 * 3. move to next level
                 */
                console.log("door was clicked from controller");
                this.view.setStatus();

                this.handleCorrectAnswer();

                if(this.view.getStatus()){
                    this.model.addCoins(50);
                    this.screenSwitcher.switchToScreen({type: "level4"}); // should be level 4 in future
                }
                // else nothing happens
            } else if (action == "puzzle") {
                // console.log("puzzle displaying");
                //this.view.getWaterLayer();
            } else if (action == "prev_level") {
                // change the player's level to the previous level since you're going back
                this.playerDataManager.setLevel({type: "level1"}); // should be level 2 in future
                // switch to the previous level screen
                this.screenSwitcher.switchToScreen({type: "level1"}); // should be level 2 in future
            } else if (action == "clue") {
                console.log("clue clicked from controller");
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
        
        node.on("mouseover", () => {
            document.body.style.cursor = "grab";
        });
        
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("dragstart", () => {
            document.body.style.cursor = "grabbing";
            console.log("drag start");
        });
        
        node.on("dragmove", () => {
            const pos = node.position();
        });
        
        node.on("dragend", () => {
            document.body.style.cursor = "grab";
            console.log("drag end");
            
            const pos = node.position();

            if (pos.x <= 50 && pos.y <= 50){
                // add the node into the inventory
                this.model.addToInventory({
                    name: "clue",
                    image: "level3clue.png",
                    width: 700,
                    height: 525
                });

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

    // check answer
    handleCorrectAnswer(): void {
        // set level to "complete"
        this.model.setIsSuccessful(true);

        this.view.getGroup().getLayer()?.draw(); // redraw the group
    }
}