import { InventoryModel } from "./InventoryModel.ts";
import { InventoryView } from "./InventoryView.ts";
import { PlayerDataManager } from "../../managers/GameStateManager.ts";
import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher} from "../../types.ts";

export class InventoryController extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private model: InventoryModel;
    private view: InventoryView;
    private listenersSetup: boolean = false;

    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.model = new InventoryModel(playerDataManager);
        this.view = new InventoryView();

        this.initialize();
    }

    private async initialize(): Promise<void> {
        // Wait a bit for the backpack image to load
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await this.refreshInventory();
        this.setupBackpackListener(); // Always setup backpack listener
    }

    private async refreshInventory(): Promise<void> {
        const inventory = this.model.getInventory();
        const currentIndex = this.model.getCurrentIndex();
        
        console.log("Refreshing inventory with", inventory.length, "items");
        await this.view.updateInventory(inventory, currentIndex);
        
        // Setup prev/next listeners after inventory is rendered (only if multiple items)
        if (inventory.length > 1) {
            this.setupNavigationListeners();
        }
    }

    private setupBackpackListener(): void {
        const backToLevel = this.view.getBackpack();
        
        console.log("Setting up backpack listener");
        backToLevel.listening(true);

        backToLevel.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });

        backToLevel.on("mouseout", () => {
            document.body.style.cursor = "default";
        });

        backToLevel.on("click", () => {
            const level = this.model.getLevel();
            console.log("Going back to level:", level);
            if (level != null) {
                this.screenSwitcher.switchToScreen(level);
            }
        });
    }

    private setupNavigationListeners(): void {
        // Only setup once
        if (this.listenersSetup) {
            return;
        }

        const prevButton = this.view.getPrevButton();
        const nextButton = this.view.getNextButton();

        console.log("Setting up navigation listeners");
        console.log("Prev button:", prevButton);
        console.log("Next button:", nextButton);

        if (prevButton && nextButton) {
            prevButton.listening(true);
            nextButton.listening(true);

            prevButton.on("mouseover", () => {
                document.body.style.cursor = "pointer";
            });

            prevButton.on("mouseout", () => {
                document.body.style.cursor = "default";
            });

            prevButton.on("click", async () => {
                console.log("Prev clicked");
                await this.prevItem();
            });

            nextButton.on("mouseover", () => {
                document.body.style.cursor = "pointer";
            });

            nextButton.on("mouseout", () => {
                document.body.style.cursor = "default";
            });

            nextButton.on("click", async () => {
                console.log("Next clicked");
                await this.nextItem();
            });

            this.listenersSetup = true;
        }
    }

    private async prevItem(): Promise<void> {
        this.model.previousItem();
        await this.refreshInventory();
    }

    private async nextItem(): Promise<void> {
        this.model.nextItem();
        await this.refreshInventory();
    }

    async show(): Promise<void> {
        console.log("Showing inventory screen");
        this.listenersSetup = false; // Reset to allow re-setup
        await this.refreshInventory();
        this.view.show();
    }

    hide(): void {
        this.view.hide();
    }

    getView(): InventoryView {
        return this.view;
    }
}