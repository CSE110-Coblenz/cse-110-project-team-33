// import statements
import Konva from "konva";

// results view
import { ResultsView } from "./ResultsView";
import { ResultsModel } from "./ResultsModel.ts";

// handle screen switching && player data (to display results)
import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher, InventoryItem, View } from "../../types.ts";
import { PlayerDataManager } from "../../GameStateManager.ts";

import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

export class ResultsController extends ScreenController {
    private view: ResultsView;
    private model: ResultsModel;
    private screenSwitcher: ScreenSwitcher;
    private playerData: PlayerDataManager;

    // win game sound effect (maybe?)
    private win_sound: HTMLAudioElement;

    // interactable items
    private button: Konva.Image; // button to return back to main menu

    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.playerData = playerDataManager;

        // initialize results views
        this.view = new ResultsView(screenSwitcher);
        this.model = new ResultsModel(playerDataManager);

        this.button = new Konva.Image();

        this.win_sound = new Audio("/res/sounds/winner.wav");
        this.win_sound.volume = 0.2;

        // initialize the screen
        this.initialize();
    }

    getView(): View {
        return this.view;
    }

    show(): void {
        this.view.show();
    }

    hide(): void {
        this.view.hide();
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
        const next = this.view.getBack();

        // handle all interactions
        this.handleInteractable(crystal, "crystal"); // click crystal to "complete" game
        this.handleInteractable(next, "next"); // click to previous level
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
            } else if(action == "next") {
                console.log("back button clicked");
                console.log(String(this.playerData.getCoins()));
                this.performActionsWithDelay();
            } else if(action == "menu"){
                this.screenSwitcher.switchToScreen({type: "menu"});
            } else if(action == "exit") {
                this.screenSwitcher.switchToScreen({ type: "exit" });
            }
        });
    }

    async performActionsWithDelay() {
        console.log("Action 1 started.");
        // display text asking what the user wants to do next
        this.view.loadBag(String(this.playerData.getCoins()), "4");

        // wait x amount of time
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 5 seconds

        // displays coins earned then wait
        console.log("Action 2 started after 5 seconds.");

        // display crystals found then wait
        this.view.loadButtons();

        /*
        const menu = this.view.getMenuButton();
        const exit = this.view.getExitButton();

        this.handleInteractable(menu, "menu"); // return to menu
        this.handleInteractable(exit, "exit"); // exit screen
        */

        // display return to menu & exit buttons
    }
}