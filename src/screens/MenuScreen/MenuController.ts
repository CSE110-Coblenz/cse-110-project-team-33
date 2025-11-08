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

		this.view = new MenuView(() => this.handleClick());
	}

	/**
	 * Handle start button click
	 */
	private handleClick(): void {
		this.screenSwitcher.switchToScreen({ type: "inventory" }); // CHANGE THIS TO YOUR LEVEL
	}

	/**
	 * Get the view
	 */
	getView(): MenuView {
		return this.view;
	}
}
