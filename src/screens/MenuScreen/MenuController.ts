import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { MenuView } from "./MenuView.ts";

/**
 * MenuController - Handles menu interactions
 */
export class MenuController extends ScreenController {
	private view: MenuView;
	private screenSwitcher: ScreenSwitcher;

	private bgm: HTMLAudioElement;

	constructor(screenSwitcher: ScreenSwitcher) {
		super();
		this.screenSwitcher = screenSwitcher;

		// testing audio
		this.bgm = new Audio("/res/sounds/bgm.mp3");
		this.bgm.volume = 0.1;
		
		this.view = new MenuView(
			() => this.handleStartClick(),
			() => this.handleLoadClick(),
			() => this.handleExitClick()
		  );
	}
	
	private handleStartClick(): void {
		this.bgm.play();
		this.screenSwitcher.switchToScreen({ type: "intro" }); 
	}

	/**
	 * Handle start button click
	 */
	private handleLoadClick(): void {
		this.screenSwitcher.switchToScreen({ type: "load" }); 
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
