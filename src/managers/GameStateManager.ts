import Konva from "konva";
import type { ScreenSwitcher, Screen, PlayerData, InventoryItem } from "../types.ts";
import { MenuController } from "../screens/MenuScreen/MenuController.ts";
// import { SettingsController } from "./screens/SettingsScreen/SettingsController";
import { InventoryController } from "../screens/InventoryScreen/InventoryController.ts";
import { IntroScreenController } from "../screens/GameScreen/IntroScreen/IntroScreenController.ts";
import { Level1Controller } from "../screens/GameScreen/Level1Screen/Level1Controller.ts";
// import { Level2Controller } from "./screens/GameScreen/Level2Screen/Level2Controller";
// import { Level3Controller } from "./screens/GameScreen/Level3Screen/Level3Controller";
// import { Level4Controller } from "./screens/GameScreen/Level4Screen/Level4Controller";
// import { ResultsController } from "./screens/ResultsScreen/ResultsController";
import { ExitController } from "../screens/MenuScreen/ExitScreen/ExitController.ts";
import { LoadController } from "../screens/MenuScreen/LoadScreen/LoadController.ts";
import { MiniGameController } from "../screens/GameScreen/MiniGameScreen/MiniGameController.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../constants.ts";
import { LocalStorageUtils } from "../utilities/LocalStorageUtils.ts";

import { PauseOverlay } from "../screens/PauseOverlay.ts";
/**
 * Main Application - Coordinates all screens
 *
 * This class demonstrates screen management using Konva Groups.
 * Each screen (Menu, Game, Results) has its own Konva.Group that can be
 * shown or hidden independently.
 *
 * Key concept: All screens are added to the same layer, but only one is
 * visible at a time. This is managed by the switchToScreen() method.
 */
class App implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private playerDataManager: PlayerDataManager;

    private menuController: MenuController;
    private introController: IntroScreenController;
    // private settingsController: SettingsController;
	private inventoryController: InventoryController;
	private level1Controller: Level1Controller;
	// private level2Controller: Level2Controller;
    // private level3Controller: Level3Controller;
    // private level4Controller: Level4Controller;
	private miniGameController: MiniGameController;
    // private resultsController: ResultsController;
	private exitController: ExitController;
	private loadController: LoadController;

    private gamePauseOverlay: PauseOverlay;

	constructor(container: string) {
		// Initialize Konva stage (the main canvas)
		this.stage = new Konva.Stage({
			container: container,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});

		this.playerDataManager = new PlayerDataManager();

		// Create a layer (screens will be added to this layer)
		this.layer = new Konva.Layer();
		this.stage.add(this.layer);
		this.gamePauseOverlay = new PauseOverlay(this);


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
		this.inventoryController = new InventoryController(this, this.playerDataManager);
        this.level1Controller = new Level1Controller(this, this.playerDataManager);
        // this.level2Controller = new Level2Controller(this);
        this.introController = new IntroScreenController(this, this.playerDataManager);
        // this.level3Controller = new Level3Controller(this);
        // this.level4Controller = new Level4Controller(this);
		this.miniGameController = new MiniGameController(this);
        // this.resultsController = new ResultsController(this);
		this.exitController = new ExitController(this);
		this.loadController = new LoadController(this);

		// Add all screen groups to the layer
		// All screens exist simultaneously but only one is visible at a time
        this.layer.add(this.menuController.getView().getGroup());
        // this.layer.add(this.settingsController.getView().getGroup());
        this.layer.add(this.introController.getView().getGroup());
		this.layer.add(this.inventoryController.getView().getGroup());
		this.layer.add(this.level1Controller.getView().getGroup());
        // this.layer.add(this.level2Controller.getView().getGroup());
        // this.layer.add(this.level3Controller.getView().getGroup());
        // this.layer.add(this.level4Controller.getView().getGroup());
		this.layer.add(this.miniGameController.getView().getGroup());
        // this.layer.add(this.resultsController.getView().getGroup());
		this.layer.add(this.exitController.getView().getGroup());
		this.layer.add(this.loadController.getView().getGroup());

        // Add the UI overlay last
        this.layer.add(this.gamePauseOverlay.getGroup());
        this.gamePauseOverlay.registerKeyEventListener(this.stage.container());
		// Draw the layer (render everything to the canvas)
		this.layer.draw();
		this.menuController.getView().show();
		this.gamePauseOverlay.setEnabled(false);

		this.switchToScreen({type: "level1"});
	}

	switchToScreen(screen: Screen): void {
		// Hide all screens first by setting their Groups to invisible
		this.menuController.hide();
		this.introController.hide();
		this.gamePauseOverlay.setEnabled(false);
        // this.settingsController.hide();
		this.inventoryController.hide();
		this.level1Controller.hide();
        // this.level2Controller.hide();
        // this.level3Controller.hide();
        // this.level4Controller.hide();
		this.miniGameController.hide();
		// this.resultsController.hide();
		this.exitController.hide();
		this.loadController.hide();
		// Show the requested screen based on the screen type
		switch (screen.type) {
			case "menu":
				this.menuController.show();
		        this.gamePauseOverlay.setEnabled(false);
				break;
            case "settings":
				// this.settingsController.show();
				break;
			case "intro":
			    this.introController.show();
   		        this.gamePauseOverlay.setEnabled(false);
			    break;
			case "inventory":
				this.inventoryController.show();
		        this.gamePauseOverlay.setEnabled(false);
				break;
			case "level1":
				this.level1Controller.show();
		        this.gamePauseOverlay.setEnabled(true);
				break;
            case "level2":
                // this.level2Controller.show();
		        // this.gamePauseOverlay.setEnabled(true);
                break;
            case "level3":
                // this.level3Controller.show();
		        this.gamePauseOverlay.setEnabled(true);
                break;
            case "level4":
                // this.level4Controller.show();
		        this.gamePauseOverlay.setEnabled(true);
                break;
			case "minigame":
				this.miniGameController.show();
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
		this.gamePauseOverlay.renderOnTop();
		this.layer.draw();
	}

	getStage(): Konva.Stage {
		return this.stage;
	}
}

export class PlayerDataManager {
	private playerData: PlayerData | null;

	constructor() {
		const loadedData = LocalStorageUtils.loadPlayerData();
		
		// If no data exists, create default player data
		if (loadedData === null) {
			console.log("No player data found, creating new player data");
			this.playerData = {
				level: { type: "level1" },
				coins: 0,
				inventory: []
			};
			// Save the initial data
			LocalStorageUtils.savePlayerData(this.playerData);
		} else {
			console.log("Loaded existing player data:", loadedData);
			this.playerData = loadedData;
		}
	}

	public getLevel(): Screen | null {
		if (this.playerData != null) {
			return this.playerData?.level;
		} else {
			return null;
		}
	}

    public setLevel(updatedLevel: Screen): void {
		if (this.playerData != null) {
			this.playerData.level = updatedLevel;
			LocalStorageUtils.savePlayerData(this.playerData);
		}
    }

	public getCoins(): number | null {
		if (this.playerData != null) {
			return this.playerData?.coins;
		} else {
			return null;
		}
	}

	public setCoins(updatedCoins: number): void {
		if (this.playerData != null) {
			this.playerData.coins = updatedCoins;
			LocalStorageUtils.savePlayerData(this.playerData);
		}
    }

	public getInventory(): InventoryItem[] {
		if (this.playerData != null) {
			return this.playerData.inventory;
		}
        return [];
    }

	public setInventory(updatedInventory: InventoryItem[]): void {
        if (this.playerData != null) {
			this.playerData.inventory = updatedInventory;
			LocalStorageUtils.savePlayerData(this.playerData);
		}
    }

	public clearInventory(): void {
		if (this.playerData != null) {
        	this.playerData.inventory = [];
        	LocalStorageUtils.savePlayerData(this.playerData);
		}
    }
}

// Initialize the application
new App("container");