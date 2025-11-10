import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { MenuView } from "./MenuView.ts";

/**
 * MenuController - Handles menu interactions
 */
export class MenuController extends ScreenController {
	private view: MenuView;
	private screenSwitcher: ScreenSwitcher;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;

		this.view = new MenuView(
			() => this.handleStartClick(),
			() => this.handleLoadClick(),
			() => this.handleExitClick()
		  );
	}

	/**
	 * Handle start button click
	 */
	private handleStartClick(): void {
		this.screenSwitcher.switchToScreen({ type: "level1" }); 
	}

	/**
	 * Handle start button click
	 */
	private handleLoadClick(): void {
		this.screenSwitcher.switchToScreen({ type: "level1" }); 
		//how are we handling the loading for games?
		// I can make a page for this 
	}

	/**
	 * Handle start button click
	 */
	private handleExitClick(): void {
		this.screenSwitcher.switchToScreen({ type: "exit" });
	}

	/**
	 * Get the view
	 */
	getView(): MenuView {
		return this.view;
	}
}
