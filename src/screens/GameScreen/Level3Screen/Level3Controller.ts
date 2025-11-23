import Konva from "konva";
import { Level3Model } from "./Level3Model.ts";
// import all the views
import { Level3View } from "./Level3View.ts";
//import { Level3PuzzleView } from "./Views/Level3PuzzleView.ts";
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
    //private puzzle_view: Level3PuzzleView;

    // constructor
    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();

        // initialize all elements
        this.screenSwitcher = screenSwitcher;
        this.playerDataManager = playerDataManager;
        this.group = new Konva.Group({visible: true});

        this.model = new Level3Model(playerDataManager);
        this.view = new Level3View();
        //this.puzzle_view = new Level3PuzzleView();
        
        //this.view.show(); 
        this.initialize();
    }

    private async initialize(): Promise<void> {
        // show the room view for level 3 (level3View)
        await this.view.getloadBackground();
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
        const doorImg = this.view.getDoor(); // door into next level if the answer is correct
        const backpackImg = this.view.getBackpack(); // click into the inventory
        const waterImg = this.view.getWater(); // click into the puzzle view
        const back_button = this.view.getBack();

        //this.handleInteractable(backpackImg, "backpack");
        this.handleInteractable(doorImg, "door");
        this.handleInteractable(backpackImg, "backpack");
        this.handleInteractable(waterImg, "puzzle");
        this.handleInteractable(back_button, "prev_level");
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
                this.screenSwitcher.switchToScreen({type: "inventory"});
            } else if (action == "door") {
                /**
                 * heck if the correct answer was input
                 * 1. change door image
                 * 2. add 50 coins
                 * 3. move to next level
                 */
                //console.log(this.view.getStatus());
                this.view.setStatus();

                this.handleCorrectAnswer();

                if(this.view.getStatus()){
                    this.model.addCoins(50);
                    this.screenSwitcher.switchToScreen({type: "level1"}); // should be level 4 in future
                }
                // else nothing happens
            } else if (action == "puzzle") {
                this.view.getWaterLayer();
            } else if (action == "prev_level") {
                this.screenSwitcher.switchToScreen({type: "level1"}); // should be level 2 in future
            }
        });

    } // end of handleInteractable function

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