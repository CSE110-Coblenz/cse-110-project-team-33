import Konva from "konva";
import type { ScreenSwitcher, Screen, PlayerData, InventoryItem } from "./types.ts";
import { MenuController } from "./screens/MenuScreen/MenuController.ts";
// import { SettingsController } from "./screens/SettingsScreen/SettingsController";
import { InventoryController } from "./screens/InventoryScreen/InventoryController.ts";
import { Level1Controller } from "./screens/GameScreen/Level1Screen/Level1Controller.ts";
import { Level2Controller } from "./screens/GameScreen/Level2Screen/Level2Controller";
// import { Level3Controller } from "./screens/GameScreen/Level3Screen/Level3Controller";
// import { Level4Controller } from "./screens/GameScreen/Level4Screen/Level4Controller";
// import { ResultsController } from "./screens/ResultsScreen/ResultsController";
import { ExitController } from "./screens/MenuScreen/ExitScreen/ExitController.ts";
import { LoadController } from "./screens/MenuScreen/LoadScreen/LoadController.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants";
import { LocalStorageUtils } from "./LocalStorageUtils.ts";

class App implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

    private menuController: MenuController;
    // private settingsController: SettingsController;
	private inventoryController: InventoryController;
	private level1Controller: Level1Controller;
	private level2Controller: Level2Controller;
    // private level3Controller: Level3Controller;
    // private level4Controller: Level4Controller;
    // private resultsController: ResultsController;
	private exitController: ExitController;
	private loadController: LoadController;

	constructor(container: string) {
		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});


		// Create a layer (screens will be added to this layer)
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);

		/* WORKAROUND: It seems that most browsers have some form of image
		 * interpolation enabled, which blurs pixelated images as they are
		 * scaled up. The below workaround disables this image smoothing so
		 * any low-res assets we use will remain crisp when rendered. */
		let context = this.layer.getContext();
		context.imageSmoothingEnabled = false;

		// Initialize all screen controllers
		// Each controller manages a Model, View, and handles user interactions
        this.menuController = new MenuController(this);
		// this.settingsController = new SettingsController(this);
		this.inventoryController = new InventoryController(this);
        this.level1Controller = new Level1Controller(this);
        this.level2Controller = new Level2Controller(this);
        // this.level3Controller = new Level3Controller(this);
        // this.level4Controller = new Level4Controller(this);
        // this.resultsController = new ResultsController(this);
		this.exitController = new ExitController(this);
		this.loadController = new LoadController(this);

		// Add all screen groups to the layer
		// All screens exist simultaneously but only one is visible at a time
        this.layer.add(this.menuController.getView().getGroup());
        // this.layer.add(this.settingsController.getView().getGroup());
		this.layer.add(this.inventoryController.getView().getGroup());
		this.layer.add(this.level1Controller.getView().getGroup());
        this.layer.add(this.level2Controller.getView().getGroup());
        // this.layer.add(this.level3Controller.getView().getGroup());
        // this.layer.add(this.level4Controller.getView().getGroup());
        // this.layer.add(this.resultsController.getView().getGroup());
		this.layer.add(this.exitController.getView().getGroup());
		this.layer.add(this.loadController.getView().getGroup());

		// Draw the layer (render everything to the canvas)
		this.layer.draw();
		
		// Hide menu and show inventory
		this.menuController.hide();
		this.inventoryController.getView().show(); // CHANGE THIS TO YOUR SPECIFIC PAGE (!!!)
	}

	switchToScreen(screen: Screen): void {
		// Hide all screens first by setting their Groups to invisible
		this.menuController.hide();
        // this.settingsController.hide();
		this.inventoryController.hide();
		this.level1Controller.hide();
        this.level2Controller.hide();
        // this.level3Controller.hide();
        // this.level4Controller.hide();
		// this.resultsController.hide();
		this.exitController.hide();
		this.loadController.hide();

		// Show the requested screen based on the screen type
		switch (screen.type) {
			case "menu":
				this.menuController.show();
				break;
            
            case "settings":
				// this.settingsController.show();
				break;
			
			case "inventory":
				this.inventoryController.show();
				break;

			case "level1":
				this.level1Controller.show();
				break;

            case "level2":
                this.level2Controller.show();
                break;

            case "level3":
                // this.level3Controller.show();
                break;

            case "level4":
                // this.level4Controller.show();
                break;

			case "result":
				// this.resultsController.show();
				break;
			case "exit":
				this.exitController.show();
				break;
			case "load":
				this.loadController.show();
				break;
		}
	}
}

export class PlayerDataManager {
	private playerData: PlayerData | null;

	constructor() {
		this.playerData = LocalStorageUtils.loadPlayerData();
	}

    public updatePlayerLevel(updatedLevel: number): void {
		if (this.playerData != null) {
			this.playerData.level = updatedLevel;
			this.savePlayerData();
		}
    }

	public updatePlayerCoins(updatedCoins: number): void {
		if (this.playerData != null) {
			this.playerData.coins = updatedCoins;
			this.savePlayerData();
		}
    }

	public loadPlayerInventory(): InventoryItem[] {
		if (this.playerData != null) {
			return this.playerData.inventory;
		}
        return [];
    }

	public updatePlayerInventory(updatedInventory: InventoryItem[]): void {
        if (this.playerData != null) {
			this.playerData.inventory = updatedInventory;
			this.savePlayerData();
		}
    }

    private savePlayerData(): void {
		if (this.playerData != null) {
        	LocalStorageUtils.savePlayerData(this.playerData);
		}
    }
}

// Initialize the application
new App("container");