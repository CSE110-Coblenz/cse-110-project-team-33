import Konva from "konva";
import type { ScreenSwitcher, Screen } from "./types.ts";
import { MenuController } from "./screens/MenuScreen/MenuController.ts";
// import { SettingsController } from "./screens/SettingsScreen/SettingsController";
import { Level1Controller } from "./screens/GameScreen/Level1Screen/Level1Controller.ts";
// import { Level2Controller } from "./screens/GameScreen/Level2Screen/Level2Controller";
// import { Level3Controller } from "./screens/GameScreen/Level3Screen/Level3Controller";
// import { Level4Controller } from "./screens/GameScreen/Level4Screen/Level4Controller";
// import { ResultsController } from "./screens/ResultsScreen/ResultsController";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants";

import { PauseOverlay } from "./PauseOverlay.ts";
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

    private menuController: MenuController;
    // private settingsController: SettingsController;
	private level1Controller: Level1Controller;
    // private level2Controller: Level2Controller;
    // private level3Controller: Level3Controller;
    // private level4Controller: Level4Controller;
    // private resultsController: ResultsController;

    private gamePauseOverlay: PauseOverlay;

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
		this.gamePauseOverlay = new PauseOverlay();


		// Initialize all screen controllers
		// Each controller manages a Model, View, and handles user interactions
        this.menuController = new MenuController(this);
		// this.settingsController = new SettingsController(this);
        this.level1Controller = new Level1Controller(this);
        // this.level2Controller = new Level2Controller(this);
        // this.level3Controller = new Level3Controller(this);
        // this.level4Controller = new Level4Controller(this);
        // this.resultsController = new ResultsController(this);

		// Add all screen groups to the layer
		// All screens exist simultaneously but only one is visible at a time
        this.layer.add(this.menuController.getView().getGroup());
        // this.layer.add(this.settingsController.getView().getGroup());
		this.layer.add(this.level1Controller.getView().getGroup());
        // this.layer.add(this.level2Controller.getView().getGroup());
        // this.layer.add(this.level3Controller.getView().getGroup());
        // this.layer.add(this.level4Controller.getView().getGroup());
        // this.layer.add(this.resultsController.getView().getGroup());

        // Add the UI overlay last
        this.layer.add(this.gamePauseOverlay.getGroup());
		// Draw the layer (render everything to the canvas)
		this.layer.draw();
        
		this.menuController.getView().show();
	}

	/**
	 * Switch to a different screen
	 *
	 * This method implements screen management by:
	 * 1. Hiding all screens (setting their Groups to invisible)
	 * 2. Showing only the requested screen
	 *
	 * This pattern ensures only one screen is visible at a time.
	 */
	switchToScreen(screen: Screen): void {
		// Hide all screens first by setting their Groups to invisible
		this.menuController.hide();
        // this.settingsController.hide();
		this.level1Controller.hide();
        // this.level2Controller.hide();
        // this.level3Controller.hide();
        // this.level4Controller.hide();
		// this.resultsController.hide();

		// Show the requested screen based on the screen type
		switch (screen.type) {
			case "menu":
				this.menuController.show();
				break;
            
            case "settings":
				// this.settingsController.show();
				break;

			case "level1":
				this.level1Controller.show();
				break;

            case "level2":
                // this.level2Controller.show();
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
		}
	}
}

// Initialize the application
new App("container");
