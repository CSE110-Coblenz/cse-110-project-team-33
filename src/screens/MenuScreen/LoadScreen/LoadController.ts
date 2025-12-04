import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { PlayerDataManager } from "../../../managers/GameStateManager.ts";
import { LoadView } from "./LoadView.ts";

export class LoadController extends ScreenController {
    private screenSwitcher: ScreenSwitcher;
    private playerDataManager: PlayerDataManager;
    private view: LoadView;

    constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
        super();
        this.screenSwitcher = screenSwitcher;
        this.playerDataManager = playerDataManager;
        this.view = new LoadView();
        this.initialize();
    }

    private async initialize(): Promise<void> {
        await this.view.whenReady(); // Wait for images to load
        this.setupClickListeners();
    }

    private updateDisplayedLevel(): void {
        const levelString = this.playerDataManager.getLevel()?.type;
        const level = levelString?.charAt(levelString.length - 1);
        if (level != null) {
            this.view.setLevel(level);
        }
    }

    // Call this when loading the saved level
    loadLevel() {
        const level = this.playerDataManager.getLevel();
        if (level != null) {
            this.screenSwitcher.switchToScreen(level);
        }
    }

    private setupClickListeners(): void {
        const yesButton = this.view.getYesButton();
        const noButton = this.view.getNoButton();
        
        this.addClickBehavior(yesButton, "yes");
        this.addClickBehavior(noButton, "no");
    }

    private addClickBehavior(node: any, action: string): void {
        node.on("mouseover", () => {
            document.body.style.cursor = "pointer";
        });

        node.on("mouseout", () => {
            document.body.style.cursor = "default";
        });

        node.on("click", () => {
            if (action == "yes") {
                this.loadLevel();
            }
            if (action == "no") {
                this.screenSwitcher.switchToScreen({ type: "menu" });
            }
        });
    }
    
    show(): void {
        this.updateDisplayedLevel(); // Update level before showing
        this.view.show();
    }

    getView(): LoadView {
        return this.view;
    }
}