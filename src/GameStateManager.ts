import Konva from "konva";

import type { ScreenSwitcher, Screen, PlayersData, PlayerData } from "./types.ts";
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
    private introController: IntroScreenController;
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
        this.introController = new IntroScreenController(this);
        // this.level3Controller = new Level3Controller(this);
        // this.level4Controller = new Level4Controller(this);
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
        this.layer.add(this.level2Controller.getView().getGroup());
        // this.layer.add(this.level3Controller.getView().getGroup());
        // this.layer.add(this.level4Controller.getView().getGroup());
        // this.layer.add(this.resultsController.getView().getGroup());
		this.layer.add(this.exitController.getView().getGroup());
		this.layer.add(this.loadController.getView().getGroup());

		// Draw the layer (render everything to the canvas)
		this.layer.draw();
		this.menuController.getView().show();

		this.switchToScreen({type: "menu"});
	}

	switchToScreen(screen: Screen): void {
		// Hide all screens first by setting their Groups to invisible
		// this.menuController.hide();
		this.introController.hide();
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
			case "intro":
			    this.introController.show();
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
		this.layer.draw();
	}
}

export class LocalStorageManager {
	private playersData: PlayersData;

	constructor() {
		this.playersData = LocalStorageUtils.loadPlayersData() || [];
	}

	public addNewPlayer(name: string): PlayerData {
        const newPlayer: PlayerData = {
			id: crypto.randomUUID(),
            name: name,
            level: 1,
            coins: 0,
            inventory: []
        };
        this.playersData.push(newPlayer);
        this.saveAll(); // Save the new player to storage
        return newPlayer;
    }

    public updatePlayerLevel(playerId: string, updatedLevel: number): void {
        const player = this.playersData.find(p => p.id === playerId);
        if (player) {
            player.level = updatedLevel;
            this.saveAll(); // Save the modification to storage
        }
    }

	public updatePlayerCoins(playerId: string, updatedCoins: number): void {
        const player = this.playersData.find(p => p.id === playerId);
        if (player) {
            player.coins = updatedCoins;
            this.saveAll(); // Save the modification to storage
        }
    }

	public loadPlayerInventory(playerId: string): string[] {
        const player = this.playersData.find(p => p.id === playerId);
        if (player) {
            return player.inventory
        }
		return []
    }

	public updatePlayerInventory(playerId: string, updatedInventory: string[]): void {
        const player = this.playersData.find(p => p.id === playerId);
        if (player) {
            player.inventory = updatedInventory;
            this.saveAll(); // Save the modification to storage
        }
    }

    private saveAll(): void {
        LocalStorageUtils.savePlayersData(this.playersData);
    }
}

export class PlayerManager {
	private players: PlayersData;
    private currentPlayerId: string | null = null; // Stores the ID of the active player

    constructor() {
		this.players = LocalStorageUtils.loadPlayersData() || [];
	}

	public setActivePlayer(playerId: string): boolean {
        const playerExists = this.players.some(p => p.id === playerId);
        if (playerExists) {
            this.currentPlayerId = playerId;
            return true;
        }
        return false;
    }
    
    public getCurrentPlayerId(): string | null {
        return this.currentPlayerId;
    }
    
    public getCurrentPlayer(): PlayerData | undefined {
        return this.players.find(p => p.id === this.currentPlayerId);
    }

}

// Initialize the application
new App("container");
