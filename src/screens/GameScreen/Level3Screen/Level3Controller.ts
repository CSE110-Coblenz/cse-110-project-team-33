import Konva from "konva";
import { Level3Model } from "./Level3Model.ts";
// import all the views
import { Level3View } from "./Level3View.ts";
import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";
// import { HintView } from "./Views/HintView.ts";

// add playerdata
import { PlayerDataManager } from "../../../GameStateManager.ts";

import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { InventoryController } from "../../InventoryScreen/InventoryController.ts";


export class Level3Controller extends ScreenController {
    private group: Konva.Group;
    private screenSwitcher: ScreenSwitcher;
    private model: Level3Model;
    private playerDataManager: PlayerDataManager;

    // all the views
    private view: Level3View;
    private puzzle_view: Level3PuzzleView;

    // constructor
    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();

        // initialize all elements
        this.screenSwitcher = screenSwitcher;
        this.playerDataManager = playerDataManager;
        this.group = new Konva.Group({visible: true});

        this.model = new Level3Model(playerDataManager);
        this.view = new Level3View();
        this.puzzle_view = new Level3PuzzleView();
        
        //this.view.show(); 
        //this.initialize();
    }

    private async initialize(): Promise<void> {
        // show the room view for level 3 (level3View)
        //await this.view.getloadBackground();
        //this.group.add(this.view.getGroup());
        //this.view.getGroup().moveToBottom();

        //this.view.show();
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
        const doorImg = this.view.getDoor();
        //const waterImg = this.view.getWater();
        const backpackImg = this.view.getBackpack();
        //this.group.add(backpackImg);

        this.handleInteractable(backpackImg, "backpack");
        this.handleInteractable(doorImg, "door");
    }

    /**
     * handle clicking on different elements:
     * put everything in controller to handle one instance of every class
     */
    private handleInteractable(node: any, action?: string): void {
        // change style of cursor to denote clickable elements
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
            node.getLayer()?.draw();
        });
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
            node.getLayer()?.draw();
        });

        node.on("click", () => {
            // check with action was clicked on
            if(action == "backpack"){
                this.screenSwitcher.switchToScreen({type: "inventory"});
            } else if (action == "door") {
                this.screenSwitcher.switchToScreen({type: "level1"});
            }
        });

    } // end of handleInteractable function

    /*
    // handle the correct answer
    private handleCorrectAnswer() {
        
    }
    */

    // be able to switch back to previous level
    /**
     * get the back arrow image
     * add a click.on to switch to previous screen
     */

    // clickable icons: back arrow, door, bag
    /*
    private addClickBehavior(node: any, action?: string): void {
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });

        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("click", () => {

        });
    }
        */

    // set up clicking into inventory and the door to leave
    /*
    private addClickBehavior(node: any, optionValue?: number, action?: string): void {
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });

        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });
        
        node.on("click", () => {
            // Check if the clicked option's value matches the correct answer
            if (action == "backpack") {
                this.screenSwitcher.switchToScreen({ type: "inventory" });
            }

            if (action == "door") {
                if (this.model.getSuccess() == true) {
                    this.model.addToCoins(50);
                    this.screenSwitcher.switchToScreen({ type: "level3" }); // CHANGE THIS LATER
                }
            }
            
            if (action == "mc") {
                if (optionValue === this.correctAnswerValue) {
                    this.handleCorrectAnswer(node);
                    this.view.animateMovePillar();
                } else {
                    this.handleWrongAnswer(node);
                }
            }
        });
    }
    */

    // if the door is clicked on -> check if the answer is correct -> if correct then add 50 coins and switch to level 4


    // level 3 successful -> move into next room

    /*
            if (action == "door") {
                if (this.model.getSuccessful()) {
                    this.model.addToCoins(50);
                    this.screenSwitcher.switchToScreen({ type: "level4" }); // level complete! move on to room 4
                }
    */

    // get the view group
    getView(): Level3View {
        return this.view;
    }
}