// import statements
import Konva from "konva";

// results view
import { ResultsView } from "./ResultsView";

// handle screen switching && player data (to display results)
import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher, InventoryItem, View } from "../../types.ts";
import { PlayerDataManager } from "../../GameStateManager.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class ResultsController extends ScreenController {
    private view: ResultsView;
    private screenSwitcher: ScreenSwitcher;

    // win game sound effect (maybe?)
    private win_sound: HTMLAudioElement;

    // interactable items
    private button: Konva.Image; // button to return back to main menu

    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();
        this.screenSwitcher = screenSwitcher;
        // initialize results views
        this.view = new ResultsView(playerDataManager);
        this.button = new Konva.Image();

        this.win_sound = new Audio("/res/sounds/winner.wav");
        this.win_sound.volume = 0.2;

        // initialize the screen
        this.initialize();
    }

    getView(): View {
        return this.view;
    }

    // load in the view && set up interactable icons
    private async initialize(): Promise<void> {
        // show the room view for level 3 (level3View)
        await this.view.getBG();

        // "add" interactions
        this.setUpInteractable();
    }

    // set up interactions with buttons
    private setUpInteractable(): void {
        // crystal -> to "complete" game and display results
        const crystal = this.view.getCrystal();
        // backpack -> access inventory
        const backpack = this.view.getBackpack();

        // handle all interactions
        this.handleInteractable(crystal, "crystal"); // click crystal to "complete" game
        this.handleInteractable(backpack, "inventory"); // click backpack to open inventory
    }

    // handle all interactions
    private handleInteractable(node: any, action?: string): void {
        // change style of cursor to denote clickable elements
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });
        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });

        node.on('click', () => {
            if(action == "crystal"){
                console.log("game complete!");
                this.win_sound.play();

                // display a "new" screen that says congratulations for finding the treasure
            } else if (action == "inventory"){
                console.log("backpack clicked!");
                this.screenSwitcher.switchToScreen({type: "inventory"});
            }
        });
    }
}