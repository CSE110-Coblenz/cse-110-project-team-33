import { ScreenController } from "../../../types.ts";
import type { ScreenSwitcher } from "../../../types.ts";
import { PlayerDataManager } from "../../../GameStateManager.ts";
import { LoadView } from "./LoadView.ts";

/**
 * LoadController - Handles load screen interactions
 */
export class LoadController extends ScreenController {
  private screenSwitcher: ScreenSwitcher;
  private playerDataManager: PlayerDataManager;

  private view: LoadView;

  constructor(screenSwitcher: ScreenSwitcher, playerDataManager: PlayerDataManager) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.playerDataManager = playerDataManager;
    this.view = new LoadView();

    var levelString = this.playerDataManager.getLevel()?.type;
    var level = levelString?.charAt(levelString.length - 1);
    if (level != null) {
      this.view.setLevel(level);
    }

    this.initialize();
  }

  private async initialize(): Promise<void> {
    await this.view.whenReady(); // Wait for images to load
    this.setupClickListeners();
  }

  loadLevel() {
    var level = this.playerDataManager.getLevel();
    if (level != null) {
      this.screenSwitcher.switchToScreen(level);
    }
  }

  private setupClickListeners(): void {
        const yesButton = this.view.getYesButton();
        const noButton = this.view.getNoButton();

        // Add a pointer cursor to indicate clickability
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
            // Check if the clicked option's value matches the correct answer
            if (action == "yes") {
              this.loadLevel();
            }

            if (action == "no") {
              this.screenSwitcher.switchToScreen({ type: "menu" });
            }
        });
    }


  getView(): LoadView {
    return this.view;
  }
}
